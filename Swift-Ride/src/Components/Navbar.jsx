import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import "../Styles/navbar.css";
import logoImg from "../assets/logo (2).png";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Tickets", link: "/tickets" },
    { label: "About", link: "/Seats" },
    
  ];

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll <= scrollPosition || currentScroll <= 50);
      setScrollPosition(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleLoginClick = () => {
    navigate("/LoginPage"); // Navigate to the login route
    handleClose(); // optionally close the menu.
  };

  return (
    <nav
      className={`navbar ${isVisible ? "visible" : "hidden"} ${
        scrollPosition > 50 ? "scrolled" : ""
      }`}
    >
      <div className="container">
      
        <Link to="/" className="logonav"><span className="logoimg"><img src ={logoImg} /></span>
         <h2>SWIFT RIDE</h2> 
        </Link>  
        <div className="menuIcon" onClick={handleOpen}>
          {open ? <FaX className="icon" /> : <FaBars className="icon" />}
        </div>
        <div className={`${open ? "menuOpen" : "menu"}`}>
          <ul className="navList">
            {navItems.map((item, ind) => (
              <li key={ind}>
                <Link
                  to={item.link}
                  className="navItem"
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="loginButton" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;