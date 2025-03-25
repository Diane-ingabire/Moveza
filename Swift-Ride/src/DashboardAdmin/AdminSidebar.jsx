import React from "react";
import { Link } from "react-router-dom";
import { FaBus, FaUser, FaChartBar, FaTicketAlt, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import "../DashboardAdmin/AdminStyles/adminsidebar.css";
import { TbGpsFilled } from "react-icons/tb";
import logo from "../assets/logo (2).png";
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/LoginPage');  
  };

  return (
    <div className="sidebar">
      <h2 className="logo">
        <span className="logocard">
          <img src={logo} alt="logo" />
        </span>SwiftRide
      </h2>
      <ul className="sidebar-menu">
        <li><Link to="/admin"><FaHome /> Dashboard</Link></li>
        <li><Link to="/admin/users"><FaUser /> Manage Users</Link></li>
        <li><Link to="/admin/buses"><FaBus /> Manage Buses</Link></li>
        <li><Link to="/admin/bookings"><FaTicketAlt /> Bookings</Link></li>
        <li><Link to="/admin/reports"><FaChartBar /> Reports</Link></li>
        <li><Link to="/admin/AdminTracking"><TbGpsFilled /> Tracking</Link></li>
        <li><Link to="/admin/settings"><FaCog /> Settings</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
