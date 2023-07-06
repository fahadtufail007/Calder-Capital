import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Contractors.module.css";
import { AddNewButton, Modal, Table, TextInput } from "../components";
import { getAllContractors } from "../store/reducers/contractor.reducer";

const Contractors = () => {
  const [isEditted, setIsEditted] = useState()

  const dispatch = useDispatch();
  const contractors = useSelector(state => state.contractor.data);

  useEffect(() => {
    dispatch(getAllContractors());
  });

  return (
    <div className={styles.contractorsContainer}>
      <AddNewButton
        title="Add New Contractor"
        onClick={() => {
          document.getElementById("modalId").click()}}
      />
      {contractors.length?
        <Table
          headings={["Name", "Email", "Date Updated", "Profile", "Actions"]}
          data = {contractors}
          title="Edit"
          setIsEditted={setIsEditted}
          componentTitle="Contractors"
          onClick={() => document.getElementById("modalId").click()}
        />
      :null
    }
    </div>
  );
};

export default Contractors;
