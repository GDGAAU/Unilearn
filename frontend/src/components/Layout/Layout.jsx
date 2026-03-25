import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../common/Footer/Footer";
import Navbar from "../common/Navbar/Navbar";
import AdminNavbar from "../../pages/Admin/Admin_Navbar/Admin_Navbar";

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/app/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;