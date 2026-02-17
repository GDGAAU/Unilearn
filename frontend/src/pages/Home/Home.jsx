import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>UNILEARN</h1>

        <p className={styles.subtitle}>
          Learn Smarter. Share Better. Build Together.
        </p>

        <p className={styles.description}>
          UniLearn is a student-built academic platform where university
          students share trusted course materials, explore real student
          projects, and understand courses before taking them. It encourages
          collaboration, transparency, and safe feedback, helping juniors learn
          from seniors while showcasing practical work across departments and
          building a supportive learning community for everyone involved.
        </p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/Signup")}
          >
            Get Started
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
