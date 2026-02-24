import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Signup.module.css";
import signupImg from "../../assets/signup-image.png";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService"; // keep this for register function

function validate(values) {}

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
  const navigate = useNavigate();

  if (contextLoading) return <div>Loading...</div>;

  function handleChange(e) {}

  async function handleSubmit(e) {}

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

              {/* Name, Email, Password, Confirm Password fields */}
              {/* ... same as before */}

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
