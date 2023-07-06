import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextInput } from "../components";
import styles from "../styles/Login.module.css";
import calderCapitalLogo from "../assets/svgs/calder-capital-logo.svg";
import { login } from "../store/reducers/login.reducer";

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const currState = useSelector((state) => state.auth);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isButtonDisabled = !email || !password || !email.match(emailRegex);
  
  const handleLogin = () => {
    console.log("hi baby")
    debugger;
    dispatch(login( {email, password}))
  }

  if (isLoggedIn) {
    // if (currState.token.role == "admin") {
    //   console.log("currState", currState);
      navigate("/clients");
    // }  
  }

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
            <Button title="Login" onClick={handleLogin} disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
            {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
