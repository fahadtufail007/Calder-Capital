import React, { useState } from "react";
import styles from "./SelectInput.module.css";

const SelectInput = ({ children, setSelected, selected }) => {


  const handleOptionChange = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    setSelected((prevState) => {
      const isObjectPresent = prevState.some((obj) => obj.key === event.target.value);
    
      if (isObjectPresent || event.target.value === "") {
        return prevState; // Object already exists, return the previous state
      } else {
        return [
          ...prevState,
          {
            key: event.target.value,
            value: event.nativeEvent.target[index].text,
            commission: 6,
          },
        ];
      }
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
