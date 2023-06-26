import React from "react";

import styles from "./Button.module.css";

const Button = ({ radius, size, title, height, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.buttonContainer}
      style={{ borderRadius: radius, height: height }}>
      <div className={styles.buttonTitle} style={{ fontSize: size }}>
        {title}
      </div>
    </button>
  );
};

export default Button;
