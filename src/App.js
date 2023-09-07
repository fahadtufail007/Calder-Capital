import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import Layout from "./layout/Layout";
import { Clients, Login, Payments, Contractors, Earnings } from "./pages";
import axios from "axios";

function ProtectedRoute({ path, element }) {
  const navigate = useNavigate();

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

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;
  const id = "";
  if (!isLoggedIn && path !== "/") {
    return <Navigate to="/" replace />;
  } else if (isLoggedIn && path === "/") {
    console.log('getting there');
    if (role == 'admin') {
      return <Navigate to="/clients" replace />;
    }
    else {
      return <Navigate to={`/earnings/${id}`} replace />
    }
  } else {
    return element;
  }
}

function App() {
  return (
    <div className={styles.app}>
      <Layout>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Login />} path="/" />} />
          <Route
            path="/clients"
            element={<ProtectedRoute element={<Clients />} path="/clients" />}
          />
          <Route
            path="/payments"
            element={<ProtectedRoute element={<Payments />} path="/payments" />}
          />
          <Route
            path="/contractors"
            element={<ProtectedRoute element={<Contractors />} path="/contractors" />}
          />
          <Route
            path="/earnings/:userId"
            element={<ProtectedRoute element={<Earnings />} path="/earnings" />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
