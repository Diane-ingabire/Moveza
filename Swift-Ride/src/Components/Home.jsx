import React from "react";
import { motion } from "framer-motion";
import Search from "./Search";
import "../Styles/home.css";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaWifi } from "react-icons/fa";
import { TbRouteScan } from "react-icons/tb";

const servicesData = [
  {
    icon: RiSecurePaymentLine,
    title: "Secure Payment",
    desc: "Track your bus in real-time and never miss your ride again. Get accurate ETAs and route information.",
  },
  {
    icon: RiSecurePaymentLine,
    title: "Online Booking",
    desc: "Easily book your tickets online and avoid long queues at the bus station.",
  },
  {
    icon: RiSecurePaymentLine,
    title: "Customer Support",
    desc: "24/7 customer support to assist with your travel needs and inquiries.",
  },
];

const topSearchData = [
  { routeFrom: "Nyabugogo", routeTo: "Nyanza", timeDuration: "1hr 30min", price: "300RWF" },
  { routeFrom: "Nyabugogo", routeTo: "Huye", timeDuration: "3hrs", price: "300RWF" },
  { routeFrom: "Nyabugogo", routeTo: "Rubavu", timeDuration: "4hrs", price: "300RWF" },
  { routeFrom: "Nyabugogo", routeTo: "Nyanza", timeDuration: "1hr 30min", price: "300RWF" },
  { routeFrom: "Nyabugogo", routeTo: "Muhanga", timeDuration: "1hr", price: "300RWF" },
  { routeFrom: "Nyabugogo", routeTo: "Gaseke", timeDuration: "1hr", price: "300RWF" },
];

const Hello = () => {
  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="Homecontainer">
        <motion.div
          className="hello-container"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          <div className="hello-overlay">
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="hello-text"
            >
              Get your bus tickets
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="hello-heading"
            >
              Find the best bus for you!
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Search />
            </motion.div>
          </div>
        </motion.div>

        <div className="services-container">
          <h1 className="services-title">
            Our <span className="highlight">Services</span>
          </h1>
          <div className="services-grid">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="service-header">
                    <div className="service-icon">
                      <IconComponent className="icon" />
                    </div>
                    <h1 className="service-title">{service.title}</h1>
                  </div>
                  <p className="service-desc">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="topsearch-container">
          <h1 className="topsearch-title">
            Top Search <span className="highlight">Routes</span>
          </h1>
          <div className="topsearch-grid">
            {topSearchData.map((route, index) => (
              <div key={index} className="topsearch-card">
                <div className="route-info">
                  <div className="route-header">
                    <p className="route-label">From</p>
                    <p className="route-label">To</p>
                  </div>
                  <div className="route-details">
                    <h1 className="route-text">{route.routeFrom}</h1>
                    <div className="route-duration">{route.timeDuration}</div>
                    <h1 className="route-text">{route.routeTo}</h1>
                  </div>
                </div>
                <div className="facilities">
                  <div className="facility">
                    <FaWifi className="facility-icon" />
                    <p className="facility-text">Internet</p>
                  </div>
    
                  <div className="facility">
                    <TbRouteScan className="facility-icon" />
                    <p className="facility-text">Charging</p>
                  </div>
                  <div className="facility">
                    <TbRouteScan className="facility-icon" />
                    <p className="facility-text">AC</p>
                  </div>
                </div>
                <div className="price-reserve">
                  <h1 className="price">{route.price} RWF</h1>
                  <button className="reserve-btn">Reserve Seat</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hello;
