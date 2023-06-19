import React, { useState } from "react";
import styles from "./SelectInput.module.css";

const SelectInput = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className={styles.didFloatingLabelContent}>
        <select
          className={styles.didFloatingSelect}
          value={selectedOption}
          onChange={handleOptionChange}>
          <option value=""></option>
          {children}
        </select>
        <label
          className={`${styles.didFloatingLabel} ${
            selectedOption ? styles.floating : ""
          }`}>
          Assign To{" "}
          {selectedOption ? <span className={styles.span}>*</span> : ""}
        </label>
      </div>
    </>
  );
};

export default SelectInput;
