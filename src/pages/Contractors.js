import React, { useEffect, useState } from "react";

import styles from "../styles/Contractors.module.css";
import { AddNewButton, Modal, Table, TextInput } from "../components";
import { useSelector } from "react-redux";

const Contractors = () => {
  const {data} = useSelector(state=> state.contractor)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)

  const [isEditted, setIsEditted] = useState({})


  useEffect(() => {
    // validateForm();
    if (Object.keys(isEditted).length) {
      setCreateUpdateFlag(false)
      const [firstName, lastName] = isEditted['name'].split(' ')
      console.log("EJE", isEditted['name']);
      setFirstName(firstName)
      setLastName(lastName)
      setEmail(isEditted['email'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, isEditted]);


  return (
    <div className={styles.contractorsContainer}>
      <Modal modalTitle="Employee" createUpdateFlag={createUpdateFlag}>
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
          document.getElementById("modalId").click()}}
      />
      <Table
        headings={["Name", "Email", "Date Updated", "Actions"]}
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
