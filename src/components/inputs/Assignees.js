import React from "react";
import styles from "./Assignees.module.css";

import closeIcon from "../../assets/svgs/close-icon.svg";

const Assignees = ({ option, setSelected, payment, disableCrossIcon = false }) => {
  const handleDelete = () => {
    setSelected(prevData => prevData.filter(item => item.key !== option.key))
  }
  const onCommissionChange = (e) => {
    setSelected(prevState => {
      return prevState.map(obj => {
        if (obj.key === option.key && obj.id === option.id) {
          return { ...obj, commission: e.target.value };
        }
        return obj;
      });
    })
  }
  const commissionAmmount = (payment * option.commission * 0.01) + payment
  return (
    <div className={styles.assigneesWrapper}>
      <div className={styles.assigneeName}>{option.value}</div>
      <div className={styles.commissionWrapper}>
        <div className={styles.assigneeCommission}>
          Commission: {payment && <span className={styles.commissionPrice}>${parseInt(commissionAmmount).toFixed(2)}</span>}
        </div>
        <input className={styles.commissionButton} value={option.commission} type="number" onChange={onCommissionChange} />
        <div className={styles.percentageCommission}>%</div>
        {!disableCrossIcon && <img className={styles.closeIcon} src={closeIcon} alt="icon" onClick={handleDelete} />}
      </div>
    </div>
  );
};

export default Assignees;
