import { useState } from "react";
import styles from "./Signup.module.css";
import signupImg from '../../assets/signup-image.png';






function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}






export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });



  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }


function handleSubmit(e) {
  e.preventDefault();
  console.log("Form data:", values);

  const validationErrors = validate(values);
  setErrors(validationErrors);


  if (Object.keys(validationErrors).length > 0) return;


  console.log("Form submitted successfully!");
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

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
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

                {errors.email && (
                  <span className={styles.errorText}>
                    {errors.email}
                  </span>
                )}
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

                {errors.name && (
                  <span className={styles.errorText}>
                    {errors.name}
                  </span>
                )}
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

                {errors.password && (
                  <span className={styles.errorText}>
                    {errors.password}
                  </span>
                )}
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

                {errors.confirmPassword && (
                  <span className={styles.errorText}>
                    {errors.confirmPassword}
                  </span>
                )}
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
