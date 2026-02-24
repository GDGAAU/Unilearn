import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Signup.module.css";
import signupImg from "../../assets/signup-image.png";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

/* ── Validation ── */
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
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const { confirmPassword, ...payload } = values;
      const data = await authService.register(payload);

      // loginUser expects { user, token } from your context
      loginUser(data);

      // Redirect to projects (or home)
      navigate("/projects");
    } catch (err) {
      const message = err.message || "Registration failed";
      setServerError(message);

      setTimeout(() => {
        setServerError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Left Image */}
          <div className={styles.imageWrapper}>
            <img
              src={signupImg}
              alt="Study desk in a library"
              className={styles.image}
            />
          </div>

          {/* Right Form Panel */}
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

              {/* Name */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  required
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>E-mail</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@mail.com"
                  value={values.email}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  required
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={values.password}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  required
                />
                {errors.password && (
                  <span className={styles.errorText}>{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <span className={styles.errorText}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className={styles.buttonWrapper}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? "Creating Account..." : "Get Started"}
                </button>
              </div>

              <p className={styles.signupText}>
                Already have an account? <Link to="/Login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}