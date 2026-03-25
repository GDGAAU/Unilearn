import { useState } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Admin_navbar.module.css";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/app/admin" onClick={closeMenu}>UNILEARN</Link>
        </div>

        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? styles.barOpen : ""}></span>
          <span className={isOpen ? styles.barOpen : ""}></span>
          <span className={isOpen ? styles.barOpen : ""}></span>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>

 <li>
            <Link
              to="/app/admin/courses"
              onClick={closeMenu}
              className={isActive("/app/admin/Courses") ? styles.active : ""}
            >
              Courses
            </Link>
          </li>
 <li>
            <Link
              to="/app/admin/Instructors"
              onClick={closeMenu}
              className={isActive("/app/admin/Instructors") ? styles.active : ""}
            >
              Instructors
            </Link>
          </li>


          <li>
            <Link
              to="/app/admin/insights"
              onClick={closeMenu}
              className={isActive("/app/admin/insights") ? styles.active : ""}
            >
              Insights
            </Link>
          </li>
          <li>
            <Link
              to="/app/admin/projects"
              onClick={closeMenu}
              className={isActive("/app/admin/projects") ? styles.active : ""}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/app/admin/accounts"
              onClick={closeMenu}
              className={isActive("/app/admin/accounts") ? styles.active : ""}
            >
              Accounts
            </Link>
          </li>
          <li>
            <Link
              to="/app/admin/profile"
              onClick={closeMenu}
              className={isActive("/app/admin/profile") ? styles.active : ""}
            >
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

export default AdminNavbar;