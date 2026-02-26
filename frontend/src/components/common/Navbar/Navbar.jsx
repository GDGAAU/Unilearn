import { useState } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>UNILEARN</Link>
        </div>

    
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? styles.barOpen : ""}></span>
          <span className={isOpen ? styles.barOpen : ""}></span>
          <span className={isOpen ? styles.barOpen : ""}></span>
        </div>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
          <li>
            <Link to="/courses" onClick={closeMenu} className={location.pathname === "/courses" ? styles.active : ""}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/instructors" onClick={closeMenu} className={location.pathname === "/instructors" ? styles.active : ""}>
              Instructors
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeMenu} className={(location.pathname === "/projects" || location.pathname === "/") ? styles.active : ""}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={closeMenu} className={location.pathname === "/profile" ? styles.active : ""}>
              Profile
            </Link>
          </li>
         
          <li className={styles.mobileLogout}>
            <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
          </li>
        </ul>

        
        <div className={styles.actions}>
          <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;