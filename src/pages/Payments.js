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

const Payments = () => {
  return (
    <div className={styles.paymentsContainer}>
      <Modal modalTitle="Add New Payment">
        <TextInput
          label="Client Name"
          star="*"
          placeholder="Client Name"
          type="text"
        />
        <TextInput label="Payment" star="*" placeholder="Payment" type="text" />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="Date Range"
          type="date"
        />
        <SelectInput>
          <option value="1">Asad</option>
          <option value="2">Usman</option>
          <option value="3">Ali</option>
          <option value="4">Ahmad</option>
          <option value="5">Khan</option>
        </SelectInput>
        <Assignees />
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
