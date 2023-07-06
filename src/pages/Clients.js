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
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../store/reducers/client.reducer";

const Clients = () => {
  const assignedToOptions = useSelector(state=> state.client.assignedTo)

  const [selectedOption, setSelectedOption] = useState([]);
  const [id, setId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isEditted, setIsEditted] = useState({});
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [clients, setClients] = useState([])
  const appClients = useSelector(state => state.client.data);
  const dispatch = useDispatch()

  const validateForm = () => {
  //   const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email format
  
  //   // Perform your validation checks here
  //   const isFirstNameValid = /^[a-zA-Z]+$/.test(firstName); // Check if firstName contains only letters
  //   const isLastNameValid = /^[a-zA-Z]+$/.test(lastName); // Check if lastName contains only letters
  //   const isEmailValid = emailRegex.test(email); // Check if email matches the email format
  //   // const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty
  
  //   const isValid = isFirstNameValid && isLastNameValid && isEmailValid ;
  //   setIsButtonDisabled(!isValid);
  };

  const addUpdateClient = () => {
  //   if (Object.keys(isEditted).length) {
  //     dispatch(updateClient({ data: {f_name: firstName, l_name: lastName, email}, id: id}))
  //   } else {
  //     dispatch(addClient({ f_name: firstName, l_name: lastName, email}))
  //   }
  }
  useEffect(() => {
    dispatch(getAllClients());
  });

  // useEffect(() => {
  //   validateForm();
  //   if (Object.keys(isEditted).length) {
  //     setCreateUpdateFlag(false)
  //     const [firstName, lastName] = isEditted['name'].split(' ')
  //     setFirstName(firstName)
  //     setLastName(lastName)
  //     setEmail(isEditted['email'])
  //     setSelectedOption(isEditted['assigned'])
  //     setId(isEditted['id'])
  //     setIsEditted("")
  //   }
  // }, [firstName, lastName, email, selectedOption, isEditted]);
  return (
    <div className={styles.clientsContainer}>
      <Modal modalTitle={"Client"} onClick={addUpdateClient} disable={false} createUpdateFlag={createUpdateFlag}>
        <TextInput
          label="First Name"
          star="*"
          placeholder="First Name"
          type="text"
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
          {assignedToOptions?.map(option => <option value={option.id}>{option.value}</option>)}
        </SelectInput>
        {selectedOption.map((option)=>{
          return <Assignees key={option.key}  option={option} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Client"
        onClick={() => {
          setCreateUpdateFlag(true)
          setSelectedOption([])
          setEmail("")
          setFirstName("")
          setLastName("")
          document.getElementById("modalId").click()}}
      />
      {
        clients.length?
        <Table
          headings={["Name", "Email", "Date Updated", "Assigned To", "Actions"]}
          data={appClients}
          title="Edit"
          componentTitle="Clients"
          setIsEditted={setIsEditted}
        />:null

      }
    </div>
  );
};

export default Clients;
