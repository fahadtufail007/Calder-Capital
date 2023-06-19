import React from "react";

import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Layout from "./layout/Layout";
import { Clients, Login, Payments, Contractors, Earnings } from "./pages";

function App() {
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
