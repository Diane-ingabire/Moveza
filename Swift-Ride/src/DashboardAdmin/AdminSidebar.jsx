import React from "react";
import { Link } from "react-router-dom";
import { FaBus, FaUser, FaChartBar, FaTicketAlt, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import "../DashboardAdmin/AdminStyles/adminsidebar.css"

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">SwiftRide</h2>
      <ul className="sidebar-menu">
        <li><Link to="/admin"><FaHome /> Dashboard</Link></li>
        <li><Link to="/admin-users"><FaUser /> Manage Users</Link></li>
        <li><Link to="/admin-buses"><FaBus /> Manage Buses</Link></li>
        <li><Link to="/admin-bookings"><FaTicketAlt /> Bookings</Link></li>
        <li><Link to="/admin-reports"><FaChartBar /> Reports</Link></li>
        <li><Link to="/admin-settings"><FaCog /> Settings</Link></li>
      </ul>
      <button className="logout-btn"><FaSignOutAlt /> Logout</button>
    </div>
  );
};

export default AdminSidebar;
