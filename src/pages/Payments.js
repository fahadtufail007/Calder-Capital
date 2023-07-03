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
import { addPayment } from "../store/thunk/payment.thunk";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { formatDate } from "../util/helper";





const Payments = () => {
  const assignedToOptions = useSelector(state=> state.client.assignedTo)
  const [isEditted, setIsEditted] = useState({});
  const data = useSelector(state=> state.payment.data)
  const [selectedOption, setSelectedOption] = useState([]);
  const [name, setName] = useState("")
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [payment, setPayment] = useState()
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch()
  const handleCreate = () => {
    dispatch(addPayment({selectedOption, name, dateStart, dateEnd}))
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

  return (
    <div className={styles.paymentsContainer}>
      <Modal modalTitle="Payment" disable={isButtonDisabled} onClick={handleCreate} createUpdateFlag={createUpdateFlag}>
        <TextInput
          label="Client Name"
          star="*"
          placeholder="Client Name"
          type="text"
          value={name}
          setValue={setName}
        />
        <TextInput 
          label="Payment"
          star="*"
          placeholder="Payment"
          type="number"
          value={payment}
          setValue={setPayment}/>
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
        {selectedOption.map((option)=>{
          return <Assignees key={option.key}  option={option} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Payment"
        onClick={() => {
          setCreateUpdateFlag(true)
          document.getElementById("modalId").click()}}
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
        data={data}
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
