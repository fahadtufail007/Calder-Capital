import React from "react";

import styles from "./ActionButton.module.css";
import dropdownIcon from "../../assets/svgs/dropdown-icon.svg";

const ActionButton = ({ onClick, title }) => {
  return (
    <div class="dropdown">
      <div
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className={styles.buttonContainer}>
        <div className={styles.buttonTitle}>Action</div>
        <img src={dropdownIcon} alt="icon" />
      </div>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <button onClick={onClick} class="dropdown-item">
            {title}
          </button>
        </li>
        <li>
          <button class="dropdown-item">Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default ActionButton;
