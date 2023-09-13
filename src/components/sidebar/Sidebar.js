import React, { useState } from "react";

import styles from "./Sidebar.module.css";
import menuIcon from "../../assets/svgs/menu-icon.svg";
import logoutIcon from "../../assets/svgs/logout-icon.svg";
import clientsIcon from "../../assets/svgs/clients-icon.svg";
import paymentIcon from "../../assets/svgs/payment-icon.svg";
import contractorsIcon from "../../assets/svgs/contractors-icon.svg";
import earningsIcon from "../../assets/svgs/earning-icon.svg";

import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/login.reducer";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  function handleLogout() {
    dispatch(logout());
    toast("Loggedout successfully", { type: "success" })
  }

  return (
    <nav className={styles.sidebar}>
      <div>
        <div className={styles.sidebarLogoWrapper}>
          <div className={styles.sidebarCode}>1099COMP</div>
          <img src={menuIcon} alt="icon" />
        </div>
        <ul className={styles.sideNav}>
          {role === 'admin' && <Link to="/clients" className={styles.links}>
            <li
              className={
                location.pathname === "/clients"
                  ? styles.sideNavItemActive
                  : styles.sideNavItem
              }>
              <img src={clientsIcon} alt="icon" />
              <span>Clients</span>
            </li>
          </Link>}
          {role === 'admin' &&
            <Link to="/payments" className={styles.links}>
              <li
                className={
                  location.pathname === "/payments"
                    ? styles.sideNavItemActive
                    : styles.sideNavItem
                }>
                <img src={paymentIcon} alt="icon" />
                <span>Payments</span>
              </li>
            </Link>}
          {role === 'admin' && <Link to="/contractors" className={styles.links}>
            <li
              className={
                location.pathname === "/contractors"
                  ? styles.sideNavItemActive
                  : styles.sideNavItem
              }>
              <img src={contractorsIcon} alt="icon" />
              <span>Contractors</span>
            </li>
          </Link>}
          {role !== 'admin' && <Link to={`/earnings/${userId}`} className={styles.links}>
            <li
              className={
                location.pathname === `/earnings/${userId}`
                  ? styles.sideNavItemActive
                  : styles.sideNavItem
              }>
              <img src={earningsIcon} alt="icon" />
              <span>My Earnings</span>
            </li>
          </Link>}
        </ul>
      </div>
      <Link to="/" className={styles.links} onClick={handleLogout}>
        <div className={styles.logoutButtton}>
          <img src={logoutIcon} alt="icon" />
          <div className={styles.logout}>Logout</div>
        </div>
      </Link>
    </nav >
  );
};

export default Sidebar;
