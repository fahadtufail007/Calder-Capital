import React, { useState } from "react";
import styles from "./SelectInput.module.css";

const SelectInput = ({ children, setSelected, selected }) => {


  const handleOptionChange = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setSelected(
      {
        ...selected, [event.target.value]: event.nativeEvent.target[index].text
      });
  };

  return (
    <>
      <div className={styles.didFloatingLabelContent}>
        <select
          className={styles.didFloatingSelect}
          value={selected.key}
          onChange={handleOptionChange}>
          <option value=""></option>
          {children}
        </select>
        <label
          className={`${styles.didFloatingLabel} ${
            selected ? styles.floating : ""
          }`}>
          Assign To{" "}
          {selected ? <span className={styles.span}>*</span> : ""}
        </label>
      </div>
    </>
  );
};

export default SelectInput;
