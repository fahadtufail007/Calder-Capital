import React, { useEffect, useState } from "react";

import styles from "../styles/Contractors.module.css";
import { AddNewButton, Modal, Table, TextInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addContractor, getContractors, updateContractor } from "../store/thunk/contractor.thunk";
import moment from 'moment';

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
      const { f_name, l_name } = isEditted;
      setFirstName(f_name)
      setLastName(l_name)
      setEmail(isEditted['email'])
      setId(isEditted['_id'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, isEditted, password, confirmPassword]);

  const isPasswordMatched = password.length > 0 && password === confirmPassword;
  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email format

    // Perform your validation checks here
    const isFirstNameValid = /^[a-zA-Z0-9\s]+$/.test(firstName); // Check if firstName contains letters, numbers and spaces
    // const isLastNameValid = /^[a-zA-Z\s]+$/.test(lastName); // Check if lastName contains only letters
    const isEmailValid = emailRegex.test(email); // Check if email matches the email format

    // const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty

    const isValid = isFirstNameValid && isEmailValid && password.length > 0;
    setIsButtonDisabled(!isValid);
  };

  const addUpdateEmployee = () => {

    const data = {
      f_name: firstName,
      l_name: lastName,
      email,
      password,
      is_verified: true,
      is_admin: false
    }
    if (password == '') {
      delete data.password;
    }
    if (!createUpdateFlag) {
      dispatch(updateContractor({ data, id }))
    } else {
      dispatch(addContractor(data))
    }
  }

  return (
    <div className={styles.contractorsContainer}>
      <Modal passwordValidate={isPasswordMatched} modalTitle="Contractor" createUpdateFlag={createUpdateFlag} onClick={addUpdateEmployee} disable={isButtonDisabled}>
        <TextInput
          label="Contractor Name "
          star="*"
          placeholder="Contractor Name"
          type="text"
          value={firstName}
          setValue={setFirstName}
        />
        {/* <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
          value={lastName}
          setValue={setLastName}
        /> */}
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
        column={[
          (element) => { return `${element.f_name} ${element.l_name}` },
          'email',
          (element) => {
            return element?.updatedAt ? moment(element?.updatedAt).format('MMM DD, YYYY') : ''
          }]}
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
