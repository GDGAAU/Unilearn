import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">UNILEARN</Link>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link to="/courses" className={location.pathname === "/courses" ? styles.active : ""}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/instructors" className={location.pathname === "/instructors" ? styles.active : ""}>
              Instructors
            </Link>
          </li>
          <li>
            <Link to="/projects" className={location.pathname === "/projects" ? styles.active : ""}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/profile" className={location.pathname === "/profile" ? styles.active : ""}>
              Profile
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.logoutBtn}>Log Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;