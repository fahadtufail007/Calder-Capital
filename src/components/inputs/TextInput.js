import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ label, type, placeholder, star }) => {
  return (
    <div>
      <div className={styles.didFloatingLabelContent}>
        <input
          className={styles.didFloatingInput}
          type={type}
          placeholder={placeholder}
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
