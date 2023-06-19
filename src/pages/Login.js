import React from "react";

import styles from "../styles/Login.module.css";
import { Button, TextInput } from "../components";

import calderCapitalLogo from "../assets/svgs/calder-capital-logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="row">
      <div className={`col-6 ${styles.leftSide}`}>
        <div className={styles.logoWrapper}>
          <img width={513} height={190} src={calderCapitalLogo} alt="logo" />
          <div className={styles.code}>1099 COMP</div>
        </div>
      </div>
      <div className={`col-6 ${styles.rightSide}`}>
        <div className={styles.loginForm}>
          <div className={styles.login}>Log In</div>
          <TextInput label="Email" type="email" placeholder="Email" />
          <TextInput label="Password" type="password" placeholder="Password" />
          <div className={styles.checkboxWrapper}>
            <div className={styles.rememberMe}>Remember Me</div>
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
          <Link to="/clients">
            <Button title="Login" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
