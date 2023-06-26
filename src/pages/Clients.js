import React, { useState, useEffect } from "react";
import styles from "../styles/Clients.module.css";

import {
  AddNewButton,
  Table,
  TextInput,
  Modal,
  SelectInput,
  Assignees,
} from "../components";
import { useDispatch } from "react-redux";
import { addClient } from "../store/thunk/client.thunk";
import {  useSelector } from "react-redux/es/hooks/useSelector";

const Clients = () => {
  const assignedToOptions = useSelector(state=> state.client.assignedTo)
  const data = useSelector(state=> state.client.data)

  const [selectedOption, setSelectedOption] = useState([]);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEditted, setIsEditted] = useState({});
  const dispatch = useDispatch()

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email format
  
    // Perform your validation checks here
    const isFirstNameValid = /^[a-zA-Z]+$/.test(firstName); // Check if firstName contains only letters
    const isLastNameValid = /^[a-zA-Z]+$/.test(lastName); // Check if lastName contains only letters
    const isEmailValid = emailRegex.test(email); // Check if email matches the email format
    const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty
  
    const isValid = isFirstNameValid && isLastNameValid && isEmailValid && isSelectedOptionValid;
    setIsButtonDisabled(!isValid);
  };

  const handleCreate = () => {
    dispatch(addClient({selectedOption, firstName, lastName, email}))
  }

  useEffect(() => {
    validateForm();
    if (Object.keys(isEditted).length) {
      // console.log("ele",isEditted.length);
      const [firstName, lastName] = isEditted['name'].split(' ')
      setFirstName(firstName)
      setLastName(lastName)
      setEmail(isEditted['email'])
      setSelectedOption(isEditted['assigned'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, selectedOption, isEditted]);

  // console.log("TY", isEditted);
  return (
    <div className={styles.clientsContainer}>
      <Modal modalTitle="Add New Client" onClick={handleCreate} disable={isButtonDisabled}>
        <TextInput
          label="First Name"
          star="*"
          placeholder="First Name"
          type="search"
          setValue={setFirstName}
          value={firstName}
        />
        <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
          setValue={setLastName}
          value={lastName}
        />
        <TextInput
          label="Email Address"
          star="*"
          placeholder="Email Address"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <SelectInput setSelected={setSelectedOption} selected={selectedOption}>
          {assignedToOptions.map(option => <option value={option.id}>{option.value}</option>)}
        </SelectInput>
        {selectedOption.map((option)=>{
          return <Assignees key={option.key}  option={option} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Client"
        onClick={() => document.getElementById("modalId").click()}
      />
      <Table
        headings={["Name", "Email", "Date Updated", "Assigned To", "Actions"]}
        data={data}
        title="Edit"
        setIsEditted={setIsEditted}
        // onClick={() => document.getElementById("modalId").click()}
      />
    </div>
  );
};

export default Clients;
