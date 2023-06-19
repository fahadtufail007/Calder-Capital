import React from "react";

import styles from "./Button.module.css";

const Button = ({ radius, size, title, height, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={styles.buttonContainer}
      style={{ borderRadius: radius, height: height }}>
      <div className={styles.buttonTitle} style={{ fontSize: size }}>
        {title}
      </div>
    </div>
  );
};

export default Button;
