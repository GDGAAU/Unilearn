import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#1a1a1a", color: "#fff" }}>
      <Link to="/" style={{ color: "#1db954", fontWeight: "bold", textDecoration: "none" }}>
        Unilearn
      </Link>{" "}
      | <Link to="/courses" style={{ color: "#fff", marginLeft: "1rem" }}>Courses</Link>{" "}
      | <Link to="/login" style={{ color: "#fff", marginLeft: "1rem" }}>Login</Link>{" "}
      | <Link to="/register" style={{ color: "#fff", marginLeft: "1rem" }}>Sign Up</Link>
    </nav>
  );
};

export default Navbar;