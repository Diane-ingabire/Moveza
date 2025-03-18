import React from "react";
import { motion } from "framer-motion";
import { TbArrowsExchange } from "react-icons/tb";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import "../Styles/search.css";

const Search = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="search-container"
    >
      <div className="search-wrapper">
        {/* Location Inputs */}
        <div className="input-box">
          <FaMapMarkerAlt className="icon" />
          <input type="text" placeholder="From ..." className="input-field" />
        </div>

        <button className="exchange-button">
          <TbArrowsExchange className="exchange-icon" />
        </button>

        <div className="input-box">
          <FaMapMarkerAlt className="icon" />
          <input type="text" placeholder="To ..." className="input-field" />
        </div>

        {/* Date Picker */}
        <div className="input-box">
          <input type="date" className="input-field" />
        </div>

        {/* Search Button */}
        <button className="search-button">
          <FaSearch />
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default Search;
