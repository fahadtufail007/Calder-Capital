import React from "react";

import styles from "../styles/Login.module.css";
import { Button, TextInput } from "../components";
import calderCapitalLogo from "../assets/svgs/calder-capital-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/thunk/login.thunk";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isButtonDisabled = !email || !password || !email.match(emailRegex);
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
          <TextInput label="Email" type="email" placeholder="Email"  value={email} setValue={setEmail}/>
          <TextInput label="Password" type="password" placeholder="Password" value={password} setValue={setPassword} />
          <div className={styles.checkboxWrapper}>
            <div className={styles.rememberMe}>Remember Me</div>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
            <Button title="Login" onClick={()=> dispatch(loginAction({value: {email, password}, navigate}))} disabled={isButtonDisabled}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
