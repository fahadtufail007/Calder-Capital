import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ label, type, placeholder, star, value, setValue, blur }) => {
  return (
    <div>
      <div className={styles.didFloatingLabelContent}>
        <input
          className={styles.didFloatingInput}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onBlur={blur}
        />
        <label className={styles.didFloatingLabel}>
          {label}
          <span className={styles.star}>{star}</span>
        </label>
      </div>
    </div>
  );
};

export default TextInput;
