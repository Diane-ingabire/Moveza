import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../DashboardAdmin/AdminStyles/adminnavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="admin-nav-right">
        <div className="notification">
          <FaBell className="icon" />
          <span className="badge">3</span>
        </div>
        <div className="admin-profile">
          <FaUserCircle className="icon" />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
