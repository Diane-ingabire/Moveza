import React, { useState } from "react";
import "./dashboardstyles/DashboardNavbar.css";
import { CiLocationOn } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import Menu from './Menu';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const goToBuyTicketPage = () => {
    navigate("/dashboard/DashboardBuyticket"); 
  
  };

  const goFindbusPage = () => {
    navigate("/dashboard"); 
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="dashboardnav">
        <div className="left_dashboard_nav">
          <div className="log_dash_nav">
            <p><span className="loc-icon"><CiLocationOn /></span>Swift Ride</p>
          </div>
          <div className="Find_my_bus" onClick={goFindbusPage}> {/* Fixed onClick */}
            <p>Find my bus</p>
          </div>
          <div className="Buy_Tickets" onClick={goToBuyTicketPage}>
            <p>Buy Tickets</p>
          </div>
        </div>
        <div className="right_dashboard_nav">
          <div className="change_mode">
            <span></span>
          </div>
          <div className="icon_dash_nav"><IoNotifications /></div>
          <div className="profile_nav" onClick={toggleMenu}>G</div>
        </div>
      </div>
      {menuOpen && <Menu />}
    </nav>
  );
};

export default DashboardNavbar;
