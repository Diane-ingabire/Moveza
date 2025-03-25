import React from 'react';
import '../Styles/about.css';
import { Link } from 'react-router-dom';

const Aboutpage = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <div>
          <h1>Inspired by Seamless Travel Experiences</h1>
          <p>SwiftRide revolutionizes the way you travel by providing real-time bus tracking, online ticket booking, and secure cashless payments. Say goodbye to long queues and uncertainty!</p>
          <button onClick={() => alert('Explore our services!')}>Learn More</button>
        </div>
      </div>

      <section className="content-section">
        <h2>What is SwiftRide?</h2>
        <p>SwiftRide is a smart bus booking platform that offers real-time tracking, seamless payments, and digital QR codes for a hassle-free travel experience.</p>
      </section>

      <section className="content-section">
        <h2>Our Solution</h2>
        <p>We address common challenges faced by Rwandan commuters using innovative technology. SwiftRide ensures real-time updates, easy access to digital tickets, and cashless payments.</p>
      </section>

      <section className="content-section">
        <h2>Why Choose SwiftRide?</h2>
        <p>From urban commuters to intercity travelers, SwiftRide serves as a reliable solution for all your travel needs. Bus companies also benefit from our efficient ticketing system and fraud prevention measures.</p>
        <Link to="/services" className="cta-button">Explore Our Services</Link>
      </section>
    </div>
  );
};

export default Aboutpage;
