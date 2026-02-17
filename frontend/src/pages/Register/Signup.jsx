import { useState } from "react";
import styles from "./Signup.module.css";
import signupImg from '../../assets/signup-image.png';

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img
              src={signupImg}
              alt="Study desk in a library"
              className={styles.image}
            />
          </div>

          <div className={styles.formPanel}>
            <div className={styles.brandHeader}>
              <h1 className={styles.brandName}>UNILEARN</h1>
              <p className={styles.tagline}>
                Learn Smarter. Share Better. Build Together.
              </p>
            </div>

            <h2 className={styles.heading}>Sign Up to your account</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>E-mail</label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  placeholder="john@mail.com"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Name</label>
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="John Doe"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  placeholder="At least 8 characters"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
