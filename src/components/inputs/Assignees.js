import React from "react";
import styles from "./Assignees.module.css";

import closeIcon from "../../assets/svgs/close-icon.svg";

const Assignees = () => {
  return (
    <div className={styles.assigneesWrapper}>
      <div className={styles.assigneeName}>Abdullah</div>
      <div className={styles.commissionWrapper}>
        <div className={styles.assigneeCommission}>
          Commission: <span className={styles.commissionPrice}>$1200</span>
        </div>
        <div className={styles.commissionButton}>5</div>
        <div className={styles.percentageCommission}>%</div>

        <img className={styles.closeIcon} src={closeIcon} alt="icon" />
      </div>
    </div>
  );
};

export default Assignees;
