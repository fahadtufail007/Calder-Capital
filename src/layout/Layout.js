import React from "react";

import styles from "./Layout.module.css";
import { Header, Sidebar } from "../components";

import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <>{children}</>
  ) : (
    <div className={styles.mainContainer}>
      {/* SIDEBAR */}
      <Sidebar />
      {/* SIDEBAR */}

      {/* BODY */}
      <div className={styles.bodyContainer}>
        <Header />
        {children}
      </div>
      {/* BODY */}
    </div>
  );
};

export default Layout;
