import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import "../Styles/footer.css";
import logoImg from "../assets/logo (2).png" 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand & Social Links */}
        <div className="footer-brand">
          <h1 className="footer-logo"><span className="logoimg"><img src ={logoImg} /></span>Swift Ride</h1>
          <p className="footer-description">
            Bus is all about booking tickets through an online platform to make traveling comfortable for passengers. 
          </p>
          <div className="footer-social">
            <Link to="#" className="social-link"><FaFacebookF size={22} /></Link>
            <Link to="#" className="social-link"><FaInstagram size={22} /></Link>
            <Link to="#" className="social-link"><FaXTwitter size={22} /></Link>
            <Link to="#" className="social-link"><FaYoutube size={22} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-list">
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/account" className="footer-link">My Account</Link></li>
            <li><Link to="/reserve" className="footer-link">Reserve Your Ticket</Link></li>
            <li><Link to="/register" className="footer-link">Create Your Account</Link></li>
          </ul>
        </div>

        {/* Top Reserved Routes */}
        <div className="footer-section">
          <h2 className="footer-title">Top Reserved Routes</h2>
          <ul className="footer-list">
            <li><Link to="/routes/kathmandu-pokhara" className="footer-link">Kathmandu - Pokhara</Link></li>
            <li><Link to="/routes/pokhara-mustang" className="footer-link">Pokhara - Mustang</Link></li>
            <li><Link to="/routes/kathmandu-chitwan" className="footer-link">Kathmandu - Chitwan</Link></li>
            <li><Link to="/routes/kathmandu-lumbini" className="footer-link">Kathmandu - Lumbini</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer-section">
          <h2 className="footer-title">Support Links</h2>
          <ul className="footer-list">
            <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
            <li><Link to="/support" className="footer-link">Help & Support Center</Link></li>
            <li><Link to="/faqs" className="footer-link">FAQs</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        © 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
