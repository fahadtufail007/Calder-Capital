import React, { useEffect, useState } from "react";

import styles from "../styles/Contractors.module.css";
import { AddNewButton, Modal, Table, TextInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addContractor, getContractors, updateContractor } from "../store/thunk/contractor.thunk";

const Contractors = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.contractor)
  const [firstName, setFirstName] = useState("")
  const [id, setId] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  const [isEditted, setIsEditted] = useState({})

  useEffect(() => {
    dispatch(getContractors());
  }, []);

  useEffect(() => {
    validateForm()
    if (Object.keys(isEditted).length) {
      setCreateUpdateFlag(false)
      const [firstName, lastName] = isEditted['name'].split(' ')
      console.log("EJE", isEditted['name']);
      setFirstName(firstName)
      setLastName(lastName)
      setEmail(isEditted['email'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, isEditted, password, confirmPassword]);

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email format

    // Perform your validation checks here
    const isFirstNameValid = /^[a-zA-Z]+$/.test(firstName); // Check if firstName contains only letters
    const isLastNameValid = /^[a-zA-Z]+$/.test(lastName); // Check if lastName contains only letters
    const isEmailValid = emailRegex.test(email); // Check if email matches the email format
    const isPasswordMatched = password.length > 0 && password === confirmPassword;

    // const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty

    const isValid = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordMatched;
    setIsButtonDisabled(!isValid);
  };

  const addUpdateEmployee = () => {
    if (!createUpdateFlag) {
      dispatch(updateContractor({ data: { f_name: firstName, l_name: lastName, email, password, is_verified: true, is_admin: false }, id: id }))
    } else {
      dispatch(addContractor({ f_name: firstName, l_name: lastName, email, password, is_verified: true, is_admin: false }))
    }
  }

  return (
    <div className={styles.contractorsContainer}>
      <Modal modalTitle="Employee" createUpdateFlag={createUpdateFlag} onClick={addUpdateEmployee} disable={isButtonDisabled}>
        <TextInput
          label="First Name "
          star="*"
          placeholder="First Name"
          type="text"
          value={firstName}
          setValue={setFirstName}
        />
        <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
          value={lastName}
          setValue={setLastName}
        />
        <TextInput
          label="Email Address"
          star="*"
          placeholder="Email Address"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Password"
          star="*"
          placeholder={createUpdateFlag ? "Password" : "Change Password"}
          type="password"
          value={password}
          setValue={setPassword}
        />
        <TextInput
          label="Confirm Password"
          star="*"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          setValue={setconfirmPassword}
        />
      </Modal>
      <AddNewButton
        title="Add New Contractor"
        onClick={() => {
          setCreateUpdateFlag(true)

          // setSelectedOption([])
          setEmail("")
          setFirstName("")
          setLastName("")
          setPassword("")
          setconfirmPassword("")
          document.getElementById("modalId").click()
        }}
      />
      <Table
        headings={["Name", "Email", "Date Updated", "Actions"]}
        column={[(element) => { return `${element.f_name} ${element.l_name}` }, 'email', () => 'Missing from backend']}
        data={data}
        title="Edit"
        setIsEditted={setIsEditted}
        componentTitle="Contractors"
        onClick={() => document.getElementById("modalId").click()}
      />
    </div>
  );
};

export default Contractors;
