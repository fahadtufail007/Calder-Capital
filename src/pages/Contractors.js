import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Contractors.module.css";
import { AddNewButton, Modal, Table, TextInput } from "../components";

const Contractors = () => {
  return (
    <div className={styles.contractorsContainer}>
      <Modal modalTitle="Add New Employee">
        <TextInput
          label="First Name "
          star="*"
          placeholder="First Name"
          type="text"
        />
        <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
        />
        <TextInput
          label="Email Address"
          star="*"
          placeholder="Email Address"
          type="email"
        />
        <TextInput
          label="Password"
          star="*"
          placeholder="Password"
          type="password"
        />
        <TextInput
          label="Confirm Password"
          star="*"
          placeholder="Confirm Password"
          type="password"
        />
      </Modal>
      <AddNewButton
        title="Add New Contractor"
        onClick={() => document.getElementById("modalId").click()}
      />
      <Table
        headings={["Name", "Email", "Date Updated", "Profile", "Actions"]}
        data={[
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            profile: (
              <Link className={styles.viewProfile} to="/earnings">
                View Profile
              </Link>
            ),
          },
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            profile: (
              <Link className={styles.viewProfile} to="/earnings">
                View Profile
              </Link>
            ),
          },
        ]}
        title="Edit"
        onClick={() => document.getElementById("modalId").click()}
      />
    </div>
  );
};

export default Contractors;
