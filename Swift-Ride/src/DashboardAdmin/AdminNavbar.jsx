import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "./AdminStyles/adminnavbar.css";

const AdminNavbar = ({
  toggleSidebar,
  darkMode,
  toggleDarkMode,
  language,
  setLanguage,
}) => {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const translations = {
    en: {
      search: "Search...",
      notifications: "Notifications",
      messages: "Messages",
      profile: "Profile",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
    fr: {
      search: "Rechercher...",
      notifications: "Notifications",
      messages: "Messages",
      profile: "Profil",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
    },
    rw: {
      search: "Gushakisha...",
      notifications: "Imenyesha",
      messages: "Ubutumwa",
      profile: "Umwirondoro",
      darkMode: "Umukara",
      lightMode: "Urumuri",
    },
  };

  const t = translations[language || "en"];

  return (
    <div className={`navbaradmin ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left-admin">
        <button className="menu-btn-admin" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="search-container-admin">
          <input
            type="text"
            className="search-input-admin"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon-admin" />
        </div>
      </div>

      <div className="navbar-right-admin">
        <select
          className="language-select-admin"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="rw">Kinyarwanda</option>
        </select>

        <button className="icon-btn-admin" title={t.notifications}>
          <FaBell />
          {notifications > 0 && <span className="badge-admin">{notifications}</span>}
        </button>

        <button className="icon-btn-admin" title={t.messages}> 
          <Link to ="Adminemail" >  <FaEnvelope /></Link>
         
          {messages > 0 && <span className="badge-admin">{messages}</span>}
        </button>

        <button className="icon-btn-admin theme-toggle-admin" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="icon-btn-admin profile-btn-admin" title={t.profile}>
          <FaUser />
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
