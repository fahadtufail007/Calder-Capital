import React from "react";
import styles from "./Header.module.css";

import calderCapitalLogo from "../../assets/svgs/calder-capital-logo.svg";
import avatarIcon from "../../assets/svgs/avatar-white-icon.svg";

import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>
        {location.pathname === "/clients" && "Clients"}
        {location.pathname === "/payments" && "Payments"}
        {location.pathname === "/contractors" && "Contractors"}
        {location.pathname === "/earnings" && "My Earnings"}
      </div>
      <div className={styles.profileWrapper}>
        <img src={calderCapitalLogo} alt="logo" />
        <div className={styles.bgAvatar}>
          <img className={styles.avatar} src={avatarIcon} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
