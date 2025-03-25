import React from 'react';
import '../Dashboard/dashboardstyles/menu.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/LoginPage');  
  };

  return (
    <div className="gerayo-menu">
      <div className="menu-header">
        <div className="user-icon" onClick={handleLogout}>G</div>
        <div className="user-email">guest52138@gmail.com</div>
      </div>
      <ul className="menu-items">
        <li><Link to="#profile"><i className="icon-profile"></i> Your profile</Link></li>
        <li><Link to="#bookings"><i className="icon-bookings"></i> Manage Bookings</Link></li>
        <li><Link to="#tickets"><i className="icon-tickets"></i> Your Tickets</Link></li>
        <li><Link to="#purchase-history"><i className="icon-history"></i> Purchase history</Link></li>
        <li><Link to="#settings"><i className="icon-settings"></i> Settings</Link></li>
        <li><Link to="#premium"><i className="icon-premium"></i> Get Premium</Link></li>
        <li><Link to="#about"><i className="icon-about"></i> About Swift-Ride</Link></li>
        <li><Link to="#support"><i className="icon-support"></i> Swift-Ride Support</Link></li>
        <li><Link to="#community"><i className="icon-community"></i> Swift-Ride Community</Link></li>
      </ul>
      <div className="menu-footer">
        <Link to="#signout" className="signout-link"><i className="icon-signout"></i> Sign Out</Link>
      </div>
    </div>
  );
};

export default Menu;