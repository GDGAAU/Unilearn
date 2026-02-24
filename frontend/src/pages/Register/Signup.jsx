import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import signupImg from '../../assets/signup-image.png';
import { useAuth } from "../../context/AuthContext";







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
  const [formLoading, setFormLoading] = useState(false);

  const { loginUser, loading: contextLoading } = useAuth();

  if (contextLoading) return <div>Loading...</div>;
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
      setFormLoading(true);

      // confirmPassword is frontend-only
      const { confirmPassword, ...payload } = values;

      const data = await authService.register(payload);

      // update AuthContext
      loginUser(data);

      // redirect after successful signup
      navigate("/");
    } catch (err) {
  const message = err.response?.data?.message || "Registration failed";
  setServerError(message);

  // auto-clear after 5 seconds
  setTimeout(() => {
    setServerError("");
  }, 5000);

    } finally {
      setFormLoading(false);
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

          {/* Right Panel */}
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
                <div className={styles.serverError}>{serverError}</div>
              )}



              {/* Email */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>E-mail</label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  placeholder="john@mail.com"
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                />
                {errors.email && (
                  <span className={styles.errorText}>
                    {errors.email}
                  </span>
                )}
              </div>





              {/* Name */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Name</label>
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="John Doe"
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                />
                {errors.name && (
                  <span className={styles.errorText}>
                    {errors.name}
                  </span>
                )}
              </div>





              {/* Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  placeholder="At least 8 characters"
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ""
                  }`}
                />
                {errors.password && (
                  <span className={styles.errorText}>
                    {errors.password}
                  </span>
                )}
              </div>





              {/* Confirm Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <span className={styles.errorText}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>






              {/* Submit */}
              <div className={styles.buttonWrapper}>

<button type="submit" disabled={formLoading}  className={styles.submitButton}>
  {formLoading ? "Creating Account..." : "Get Started"}
</button>


              </div>

              {/* Divider */}
              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine} />
              </div>

              {/* Google Button (placeholder) */}
              <button
                type="button"
                className={styles.googleButton}
                onClick={() =>
                  alert("Google Sign-In not implemented yet")
                }
              >

              <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
                Continue with Google
              </button>
            </form>

            <p className={styles.loginLink}>
              Already have an account? <a href="#">Log in</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
