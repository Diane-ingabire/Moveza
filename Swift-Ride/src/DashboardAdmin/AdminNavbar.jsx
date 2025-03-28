import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaUser, FaEnvelope, FaBell, FaSignOutAlt, FaCog, FaInbox } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../DashboardAdmin/AdminStyles/adminnavbar.css'
import Americanflag from "../assets/flag.png";
import user from "../assets/shortimag2.jpg";

const AdminNavbar = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [showCountries, setShowCountries] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const countries = [
    { code: 'US', name: 'English' },
    { code: 'FR', name: 'French' },
    { code: 'ES', name: 'Spanish' },
    { code: 'DE', name: 'German' }
  ];

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <nav className="dashnavbar_admin">
      <div className="dashnavbar-left_admin">
        <button className="menu-button_admin">
          <FaBars />
        </button>

        <div className="search-container_admin">
          <input type="text" placeholder="Search" className="search-input_admin" />
          <FaSearch className="search-icon_admin" />
        </div>
      </div>

      <div className="dashnavbar-right">
        <button onClick={toggleTheme} className="nav-button theme-toggle">
          {isDark ? <FiSun /> : <FiMoon />}
        </button>

        <div className="dropdown-container">
          <button onClick={() => setShowCountries(!showCountries)} className="nav-button">
            <img src={Americanflag} alt="Language" className="country-flag" />
          </button>
          {showCountries && (
            <div className="dropdown-menu">
              {countries.map((country) => (
                <button key={country.code} className="dropdown-item">
                  {country.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button onClick={() => setShowMessages(!showMessages)} className="nav-button">
            <FaEnvelope />
          </button>
          {showMessages && <div className="dropdown-menu"><div className="dropdown-item">No new messages</div></div>}
        </div>

        <div className="dropdown-container">
          <button onClick={() => setShowNotifications(!showNotifications)} className="nav-button">
            <FaBell />
          </button>
          {showNotifications && <div className="dropdown-menu"><div className="dropdown-item">No new notifications</div></div>}
        </div>

        <div className="dropdown-container">
          <button onClick={() => setShowProfile(!showProfile)} className="nav-button">
            <img src={user} alt="user" />
          </button>

          {showProfile && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item"><FaUser /> Profile</Link>
              <Link to="/inbox" className="dropdown-item"><FaInbox /> Inbox</Link>
              <Link to="/settings" className="dropdown-item"><FaCog /> Settings</Link>
              <button className="dropdown-item logout"><FaSignOutAlt /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
