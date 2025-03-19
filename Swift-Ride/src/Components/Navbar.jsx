import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import "../Styles/navbar.css";
import LoginPage from "./LoginPage";

const Navbar = () => {
    const [model, setModel] = useState(false);

    const handleLoginForm = () => {
      setModel(!model);
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [open, setOpen] = useState(false);
     
    const navItems = [
        { label: "Home", link: "/" },
        { label: "Services", link: "/services" },
        { label: "Tickets", link: "/tickets" },
        { label: "About", link: "/Seats" }
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

    return (
        <nav className={`navbar ${isVisible ? "visible" : "hidden"} ${scrollPosition > 50 ? "scrolled" : ""}`}>
             {model && <LoginPage onClose={handleLoginForm} />}
            <div className="container">
                <Link to="/" className="logo">SWIFT</Link>
                <div className="menuIcon" onClick={handleOpen}>
                    {open ? <FaX className="icon" /> : <FaBars className="icon" />}
                </div>
                <div className={`${open ? "menuOpen" : "menu"}`}>
                    <ul className="navList">
                        {navItems.map((item, ind) => (
                            <li key={ind}>
                                <Link to={item.link} className="navItem" onClick={handleClose}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className="loginButton" onClick={handleLoginForm}>Log In</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
