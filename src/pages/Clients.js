import React, { useState } from "react";
import styles from "../styles/Clients.module.css";

import {
  AddNewButton,
  Table,
  TextInput,
  Modal,
  SelectInput,
  Assignees,
} from "../components";

const Clients = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  return (
    <div className={styles.clientsContainer}>
      <Modal modalTitle="Add New Client">
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
          <option value="1">Abdullah</option>
          <option value="2">Asad</option>
          <option value="3">Usman</option>
          <option value="4">Ali</option>
          <option value="5">Ahmad</option>
        </SelectInput>
        {Object.entries(selectedOption).map((value)=>{
          return <Assignees value={value} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Client"
        onClick={() => document.getElementById("modalId").click()}
      />
      <Table
        headings={["Name", "Email", "Date Updated", "Assigned To", "Actions"]}
        data={[
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            assigned: (
              <div className={styles.assignees}>
                Abdullah, Rameez, Asad, Faiqa, Faryal, Ushna
              </div>
            ),
          },
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            assigned: (
              <div className={styles.assignees}>
                Abdullah, Rameez, Asad, Faiqa, Faryal, Ushna
              </div>
            ),
          },
        ]}
        title="Edit"
        onClick={() => document.getElementById("modalId").click()}
      />
    </div>
  );
};

export default Clients;
