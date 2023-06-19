import React from "react";

import styles from "./RevenueCard.module.css";

const RevenueCard = ({ title, revenue, icon }) => {
  return (
    <div className={styles.revenueCardContainer}>
      <div className={styles.totalRevenueWrapper}>
        <div className={styles.revenueText}>{title}</div>
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.revenuePrice}>{revenue}</div>
    </div>
  );
};

export default RevenueCard;
