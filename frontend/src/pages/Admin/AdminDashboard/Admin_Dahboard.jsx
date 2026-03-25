import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import Navbar from "../Admin_Navbar/Admin_Navbar"; 
import styles from "./Admin_dashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      {/* Admin Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <div className={styles.container}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/app")}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #E67E22",
            color: "#E67E22",
            padding: "6px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          ← Back to Home
        </button>

        {/* Dashboard Title */}
        <h1 className={styles.title}>Dashboard Overview</h1>

        {/* Cards */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>

          <div className={styles.card}>
            <h3>Projects</h3>
            <p>320</p>
          </div>

          <div className={styles.card}>
            <h3>Active Users</h3>
            <p>89</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;