import React from "react";
import styles from "../styles/Payments.module.css";

import {
  AddNewButton,
  Table,
  Button,
  TextInput,
  Modal,
  SelectInput,
  Assignees,
} from "../components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPayment, getPayments } from "../store/thunk/payment.thunk";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { formatDate } from "../util/helper";
import Select from 'react-select';
import axios from "axios";
import { getContractors } from "../store/thunk/contractor.thunk";
import { getClients } from "../store/thunk/client.thunk";
import moment from 'moment';

const Payments = () => {

  const dispatch = useDispatch()
  const options = [];
  const payments = useSelector(state => state.payment.payments)
  const clients = useSelector(state => state.client.data)
  const employees = useSelector(state => state.contractor.data)
  clients?.forEach(element => {
    options.push({ value: element._id, label: `${element.f_name} ${element.l_name}` })
  });

  const [isEditted, setIsEditted] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [clientId, setClientId] = useState("")
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [payment, setPayment] = useState()
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  const getEmployees = (clientId) => {
    const client = clients.find(client => client._id === clientId);
    if (client) {
      client?.assignee.map((x) => {
        setSelectedOption((prevState) => {
          const employee = employees.find(employee => employee._id === x.employee_id)
          return [
            ...prevState,
            {
              key: x.employee_id,
              value: `${employee.f_name} ${employee.l_name}`,
              commission: x.employee_percentage,
            },
          ];
        });
      })

    }
  }

  const handleAddPayment = () => {

    const assignee = [];
    selectedOption.forEach((x) => {
      assignee.push({ employee_id: x.key, employee_percentage: x.commission })
    })
    if (!createUpdateFlag) {
      // dispatch(updateClient({ data: { clientId, dateStart, dateEnd, payment, assignee }, id: id }))
    } else {
      dispatch(addPayment({ clientId, dateStart, dateEnd, payment, assignee }))
    }
  }

  const validateForm = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for yyyy-mm-dd format
    const paymentRegex = /^\d+$/; // Regular expression for alphabetic characters and spaces only

    const isValidStartDate = dateRegex.test(dateStart);
    const isValidEndDate = dateRegex.test(dateEnd);
    const isValidPayment = paymentRegex.test(payment);
    const isValidName = clientId !== ''

    const areOptionsSelected = selectedOption.length > 0;
    const isStartDateBeforeEndDate = isValidStartDate && isValidEndDate && new Date(dateStart) < new Date(dateEnd);
    const isValid = (isStartDateBeforeEndDate && isValidPayment && isValidName && areOptionsSelected);
    setIsButtonDisabled(!isValid);
  };

  useEffect(() => {
    dispatch(getPayments());
    dispatch(getClients());
    dispatch(getContractors());
  }, [])

  useEffect(() => {
    setSelectedOption([]);
    getEmployees(clientId)
  }, [clientId])

  useEffect(() => {
    validateForm();
    if (Object.keys(isEditted).length) {
      setCreateUpdateFlag(false)
      const [dateStart, dateEnd] = isEditted['date'].split("-")
      setDateStart(formatDate(dateStart))
      setDateEnd(formatDate(dateEnd))
      setClientId(isEditted['name'])
      setPayment(Number(isEditted['payment'].split(' ')[1]))
      setIsEditted("")
    }
  }, [clientId, dateStart, dateEnd, selectedOption, isEditted]);

  const getClientName = (id) => {
    const client = clients?.find((x) => x._id == id);
    if (client) {
      return `${client.f_name} ${client.l_name}`;
    } else {
      return "";
    }
  };

  const getEmpName = (id) => {
    const emp = employees?.find((x) => x._id === id);
    if (emp) {
      return `${emp.f_name}`;
    } else {
      return "";
    }
  };

  const renderEmployeeList = (assignees) => {
    return (
      assignees.map((assignee) => (
        <div key={assignee.employee_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
          <span>{getEmpName(assignee.employee_id)}</span>
          <span>{assignee.employee_percentage}%</span>
        </div>
      ))
    );
  };

  const renderEmployeeAmount = (assignees, payment) => {
    return (
      assignees?.map((assignee) => (
        <div key={assignee?.employee_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <span>{(assignee?.employee_percentage / 100) * payment} USD</span>
        </div>
      ))
    );
  };

  const getFormatedDate = (date) => {
    return date ? moment(date).format('DD MMM, YYYY') : ''
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      // width: 300, // Set your desired width
      minHeight: 45, // Set your desired height
    }),
  };

  return (
    <div className={styles.paymentsContainer}>
      <Modal modalTitle="Payment" disable={isButtonDisabled} onClick={handleAddPayment} createUpdateFlag={createUpdateFlag}>
        <Select
          className={styles.reactSelectSingle}
          // classNamePrefix="Client Name"  
          styles={customStyles}
          label="Client Name"
          placeholder="Client Name"
          onChange={(e) => {
            setClientId(e.value)
          }}
          isSearchable={true}
          required
          name="Client Name"
          options={options} />
        <TextInput
          label="Payment"
          star="*"
          placeholder="Payment"
          type="number"
          value={payment}
          setValue={setPayment} />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="Start Date"
          type="date"
          value={dateStart}
          setValue={setDateStart}
        />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="End Date"
          type="date"
          value={dateEnd}
          setValue={setDateEnd}
        />
        {selectedOption.map((option) => {
          return <Assignees key={option.key} option={option} setSelected={setSelectedOption} disableCrossIcon />
        })}

      </Modal>
      <AddNewButton
        title="Add New Payment"
        onClick={() => {
          setClientId('')
          setPayment('')
          setDateEnd('')
          setDateStart('')
          setCreateUpdateFlag(true)
          document.getElementById("modalId").click()
        }}
      />
      <Table
        headings={[
          "Client Name",
          "Date Range",
          "Payment",
          "Employee Detail",
          "Amount",
          "Actions",
        ]}
        column={[
          (element) => { return getClientName(element?.clientId) },
          (element) => { return `${getFormatedDate(element.dateStart)} -- ${getFormatedDate(element.dateEnd)}` },
          'payment',
          (element) => { return renderEmployeeList(element?.assignee) },
          (element) => { return renderEmployeeAmount(element?.assignee, element?.payment) },
        ]}
        data={payments}
        title="Edit"
        componentTitle="Payments"
        setIsEditted={setIsEditted}
      />
      <div className={styles.paymentButtonWrapper}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </div>
    </div>
  );
};

export default Payments;
