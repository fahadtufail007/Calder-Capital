import React, { useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import styles from "./App.module.css";
import Layout from "./layout/Layout";
import { Clients, Login, Payments, Contractors, Earnings } from "./pages";
import axios from "axios";

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.clear();
            navigate("/");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <div className={styles.app}>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/earnings" element={<Earnings />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
