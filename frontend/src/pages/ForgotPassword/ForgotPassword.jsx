import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import forgotImg from "../../assets/images/login.png"; 
import { authService } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email); // your service function
      setMessage(
        "Password reset link sent! Please check your email."
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageSide}>
        <img src={forgotImg} alt="Forgot Password" className={styles.image} />
      </div>

      <div className={styles.formSide}>
        <div className={styles.brand}>
          <h1>UNILEARN</h1>
          <p>Reset your password</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h3>Enter your email to reset password</h3>

          {error && <p className={styles.errorMessage}>{error}</p>}
          {message && <p className={styles.successMessage}>{message}</p>}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              className={styles.inputField}
              placeholder="john@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className={styles.loginText}>
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}