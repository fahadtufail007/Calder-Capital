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
import { addPayment, fecthClients, getPayments } from "../store/thunk/payment.thunk";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { formatDate } from "../util/helper";
import Select from 'react-select';
import axios from "axios";

const Payments = () => {

  const dispatch = useDispatch()
  const assignedToOptions = useSelector(state => state.client.assignedTo)
  const payments = useSelector(state => state.payment.payments)
  const clients = useSelector(state => state.client.data)


  const [isEditted, setIsEditted] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("")
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [payment, setPayment] = useState()
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  const handleAddPayment = () => {
    dispatch(addPayment({ selectedOption, name, dateStart, dateEnd }))
  }

  const validateForm = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for yyyy-mm-dd format
    const paymentRegex = /^[A-Za-z\s]+$/; // Regular expression for alphabetic characters and spaces only

    const isValidStartDate = dateRegex.test(dateStart);
    const isValidEndDate = dateRegex.test(dateEnd);
    const isValidPayment = paymentRegex.test(payment);
    const isValidName = paymentRegex.test(name);

    const areOptionsSelected = selectedOption.length > 0;
    const isStartDateBeforeEndDate = isValidStartDate && isValidEndDate && new Date(dateStart) < new Date(dateEnd);
    const isValid = (isStartDateBeforeEndDate && isValidPayment && isValidName && areOptionsSelected);
    setIsButtonDisabled(!isValid);
  };

  useEffect(() => {
    dispatch(getPayments());
    fetchEmployees();
  }, [])

  useEffect(() => {
    validateForm();
    if (Object.keys(isEditted).length) {
      setCreateUpdateFlag(false)
      const [dateStart, dateEnd] = isEditted['date'].split("-")
      setDateStart(formatDate(dateStart))
      setDateEnd(formatDate(dateEnd))
      setName(isEditted['name'])
      setPayment(Number(isEditted['payment'].split(' ')[1]))
      setIsEditted("")
    }
  }, [name, dateStart, dateEnd, selectedOption, isEditted]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setEmployees(res?.data)
    } catch (error) {
      console.log('err', error);
    }
  }

  const getClientName = (id) => {
    const client = clients.find((x) => console.log(x._id == id));
    if (client) {
      return `${client.f_name} ${client.l_name}`;
    } else {
      return "";
    }
  };

  const getEmpName = (id) => {
    const emp = employees.find((x) => x._id === id);
    if (emp) {
      return `${emp.f_name} ${emp.l_name}`;
    } else {
      return "";
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      // width: 300, // Set your desired width
      minHeight: 45, // Set your desired height
    }),
  };

  console.log(payments);
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
            console.log("JE", e.value);
            setName(e.value)
          }}
          isSearchable={true}
          required
          name="Client Name"
          options={clients} />
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
        <SelectInput setSelected={setSelectedOption} selected={selectedOption}>
          {assignedToOptions.map(option => <option value={option.id}>{option.value}</option>)}
        </SelectInput>
        {selectedOption.map((option) => {
          return <Assignees key={option.key} option={option} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Payment"
        onClick={() => {
          setCreateUpdateFlag(true)
          dispatch(fecthClients())
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
          (element) => { return 'Date missign from backend' },
          'amount',
          (element) => { return getEmpName(element?.clientId) },
          (element) => { return `${element.emp_share}%` },
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
