import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "./Search";
import "../Styles/ticket.css";
import { useNavigate } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";




const busData = [
  {
    name: "Horizon",
    departureTime: "06:15 PM",
    departureLocation: "Huye",
    arrivalTime: "08:45 AM",
    arrivalLocation: "Pyuthan",
    price: 1600,
    availableSeats: 5,
  },
  {
    name: "Royal",
    departureTime: "06:30 AM",
    departureLocation: "Nyabugogo",
    arrivalTime: "06:45 PM",
    arrivalLocation: "Rwamagana",
    price: 1800,
    availableSeats: 10,
  },
];

const Ticket = () => {
  const navigate = useNavigate();

  const handleReserveSeat = () => {
    navigate("/Seats");
  };

  const [priceRange, setPriceRange] = useState([1382, 2676]);
  const [filters, setFilters] = useState({
    acDeluxe: false,
    touristAcDeluxe: false,
    acSuspension: false,
    normalAcDeluxe: false,
  });

  const handlePriceChange = (event) => {
    setPriceRange([priceRange[0], event.target.value]);
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="ticket-container-ticket"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      >
        <div className="ticket-overlay">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="hello-text"
          >
            Reserve your Ticket
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="ticket-heading"
          >
            Want to change Route
          </motion.p>
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

      <div className="results-section">
      <div className="filters-column">
  <h3 className="filters-title">Apply Filters</h3>

  {/* Price Range Filter */}
  <div className="filter-card">
    <h4>Apply Filters</h4>
    <div className="price-range">
      <div className="price-labels">
        <span>Rs. {priceRange[0]}</span>
        <span>Rs. {priceRange[1]}</span>
      </div>
      <input
        type="range"
        min="1382"
        max="2676"
        value={priceRange[1]}
        onChange={handlePriceChange}
        className="price-slider"
      />
    </div>
  </div>

  {/* Bus Types Filter */}
  <div className="filter-card">
    <h4>Bus Types</h4>
    <div className="bus-types">
      {Object.keys(filters).map((filter) => (
        <div className="checkbox-group" key={filter}>
          <input
            type="checkbox"
            id={filter}
            checked={filters[filter]}
            onChange={() => handleFilterChange(filter)}
          />
          <label htmlFor={filter}>{filter.replace(/([A-Z])/g, " $1")} <span>(10)</span></label>
        </div>
        
      ))}
    </div>
  </div>
</div>


        <div className="bus-listings">
          {busData.map((bus, index) => (
            <div className="bus-card" key={index}>
              <div className="bus-info">
                <div className="bus-name">
                  <span className="bus-icon"><FaBusAlt /></span>
                  <span>{bus.name}</span>
                </div>
                
                <div className="bus-timing">
                  <div className="departure">
                    <h3>{bus.departureTime}</h3>
                    <p>{bus.departureLocation}</p>
                  </div>
                  <div className="bus-journey-icon">
                    <span><FaBusAlt /></span>
                  </div>
                  <div className="arrival">
                    <h3>{bus.arrivalTime}</h3>
                    <p>{bus.arrivalLocation}</p>
                  </div>
                </div>
                
                <div className="price-section">
                  <div className="price">
                    <h3>Rs. {bus.price}</h3>
                    <span className="per-seat">per seat</span>
                  </div>
                  <div className="seat-availability">
                    <span className="available-count">{bus.availableSeats}</span> seats available
                  </div>
                  <button className="reserve-button"  onClick={handleReserveSeat}>Reserve Seat</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ticket;
