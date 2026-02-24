import React, { useState } from "react";
import styles from "./login.module.css";
import loginImg from "../../assets/images/login.png"; 
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Link } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
   
      const data = await authService.login(email, password);
      loginUser(data); 
      navigate("/projects"); 
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageSide}>
        <img src={loginImg} alt="Login" className={styles.loginImage} />
      </div>

      <div className={styles.formSide}>
        <div className={styles.brand}>
          <h1>UNILEARN</h1>
          <p>Learn Smarter. Share Better. Build Together.</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleLogin}>
          <h3>Login to your account</h3>
          
         
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input 
              type="email"
              className={styles.inputField}
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password"
              className={styles.inputField}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.loginButton} 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <Link to="/forgot-password" className={styles.forgotPassword}>
  Forgot Password?
</Link>
        </form>
        <p className={styles.signupText}>Don't have an account?<Link to="/Register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;