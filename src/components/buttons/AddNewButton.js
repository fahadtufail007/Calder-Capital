import React from "react";

import styles from "./AddNewButton.module.css";
import plusIcon from "../../assets/svgs/plus-icon.svg";

const AddNewButton = ({ title, onClick }) => {
  return (
    <>
      <div onClick={onClick} className={styles.buttonContainer}>
        <img src={plusIcon} alt="icon" />
        <div className={styles.buttonTitle}>{title}</div>
      </div>
    </>
  );
};

export default AddNewButton;
