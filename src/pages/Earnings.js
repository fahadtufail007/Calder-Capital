import React from "react";

import styles from "../styles/Earnings.module.css";
import { Button, RevenueCard, Table } from "../components";

import totalRevenueIcon from "../assets/svgs/total-revenue-icon.svg";
import monthlyRevenueIcon from "../assets/svgs/monthly-revenue-icon.svg";
import clientsIcon from "../assets/svgs/avatar-icon.svg";

const Earnings = () => {
  return (
    <div className={styles.earningsContainer}>
      <div className={styles.revenuesHeader}>
        <div>
          <div className={styles.userName}>Abdullah Mohsin</div>
          <div className={styles.userEmail}>abdullah123@gmail.com</div>
        </div>
        <div className={styles.revenueCards}>
          <RevenueCard
            title="Total Revenue"
            revenue="$25k"
            icon={totalRevenueIcon}
          />
          <RevenueCard
            title="Monthly Revenue"
            revenue="$25k"
            icon={monthlyRevenueIcon}
          />
          <RevenueCard title="Total Clients" revenue="32" icon={clientsIcon} />
        </div>
      </div>
      <Table
        headings={[
          "Clients",
          "Client Email",
          "Last Date Updated",
          "Commission Earned",
          "Actions",
        ]}
        data={[
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            commission: "5%",
          },
          {
            name: "John Doe",
            email: "johndoe247340@gmail.com",
            date: "May 3, 2023",
            commission: "5%",
          },
        ]}
        title="Download"
      />
      <div className={styles.earningsButtonWrapper}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </div>
    </div>
  );
};

export default Earnings;
