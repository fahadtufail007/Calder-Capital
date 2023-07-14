import React, { useState, useEffect } from "react";
import moment from 'moment';
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  AddNewButton,
  Table,
  Button,
  TextInput,
  Modal,
  Assignees,
} from "../components";
import styles from "../styles/Payments.module.css";
import { addPayment, getPayments, updatePayment } from "../store/thunk/payment.thunk";
import { formatDate } from "../util/helper";
import { getContractors } from "../store/thunk/contractor.thunk";
import { getClients } from "../store/thunk/client.thunk";

const Payments = () => {

  const dispatch = useDispatch()
  const options = [];
  const payments = useSelector(state => state.payment.payments)
  const clients = useSelector(state => state.client.data)
  const employees = useSelector(state => state.contractor.data)
  clients?.forEach(element => {
    options.push({ value: element._id, label: `${element.f_name} ${element.l_name}` })
  });

  const [id, setId] = useState("")
  const [isEditted, setIsEditted] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [clientId, setClientId] = useState("")
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [payment, setPayment] = useState()
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
      const { dateStart, dateEnd, assignee } = isEditted;
      setDateStart(formatDate(dateStart))
      setDateEnd(formatDate(dateEnd))
      setClientId(isEditted['clientId'])
      setPayment(Number(isEditted['payment']))
      setIsEditted("")
      setId(isEditted['_id'])
      setSelectedOption([]);
      assignee.map((x) => {
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
  }, [clientId, dateStart, dateEnd, selectedOption, isEditted]);

  const getEmployees = (clientId) => {
    const client = clients?.find(client => client._id === clientId);
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
      dispatch(updatePayment({ data: { clientId, dateStart, dateEnd, payment, assignee }, id: id }))
    } else {
      dispatch(addPayment({ clientId, dateStart, dateEnd, payment, assignee }))
    }

    resetStates();
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

  const resetStates = () => {
    setClientId('')
    setPayment('')
    setDateEnd('')
    setDateStart('')
    setSelectedOption([]);
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
          options={options}
        />

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
          resetStates();
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
        setIsEditted={(e) => {
          setClientId(e.clientId)
          setIsEditted(e);
        }}
      />
      <div className={styles.paymentButtonWrapper}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </div>
    </div>
  );
};

export default Payments;
