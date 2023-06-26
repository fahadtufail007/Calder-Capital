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
import { useState } from "react";

const Payments = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [email, setEmail] = useState("")

  return (
    <div className={styles.paymentsContainer}>
      <Modal modalTitle="Add New Payment">
        <TextInput
          label="Client Name"
          star="*"
          placeholder="Client Name"
          type="text"
          value={name}
          setValue={setName}
        />
        <TextInput label="Payment" star="*" placeholder="Payment" type="text" />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="Date Range"
          type="date"
          value={date}
          setValue={setDate}
        />
        <SelectInput setSelected={setSelectedOption} selected={selectedOption}>
          <option value="1">Asad</option>
          <option value="2">Usman</option>
          <option value="3">Ali</option>
          <option value="4">Ahmad</option>
          <option value="5">Khan</option>
        </SelectInput>
        {Object.entries(selectedOption).map((value)=>{
          return <Assignees value={value} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Payment"
        onClick={() => document.getElementById("modalId").click()}
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
        data={[
          {
            name: "John Doe",
            date: "01 May, 2023 - 31 May, 2023",
            payment: "USD 5000",
            emplyees: "Abdullah",
            Amount: "USD 500",
          },
          {
            name: "John Doe",
            date: "01 May, 2023 - 31 May, 2023",
            payment: "USD 5000",
            emplyees: "Abdullah",
            Amount: "USD 500",
          },
        ]}
        title="Edit"
        onClick={() => document.getElementById("modalId").click()}
      />
      <div className={styles.paymentButtonWrapper}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </div>
    </div>
  );
};

export default Payments;
