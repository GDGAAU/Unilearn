import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Signup.module.css";
import signupImg from "../../assets/signup-image.png";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { loginUser, loading: contextLoading } = useAuth();
  const navigate = useNavigate();

  if (contextLoading) return <div>Loading...</div>;

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setFormLoading(true);

      const data = await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      // Assuming backend returns { user, token }
      loginUser(data);

      navigate("/");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img src={signupImg} alt="Study desk" className={styles.image} />
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
              {serverError && (
                <p className={styles.serverError}>{serverError}</p>
              )}

              {/* Full Name */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  type="submit"
                  disabled={formLoading}
                  className={styles.submitButton}
                >
                  {formLoading ? "Creating Account..." : "Get Started"}
                </button>
              </div>

              <p className={styles.signupText}>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}