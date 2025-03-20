import React from "react";
import { FaWifi } from "react-icons/fa";
import { TbRouteScan } from "react-icons/tb";
import "../Styles/topsearch.css";

const topSearchData = [
  { routeFrom: "Nyabugogo", routeTo: "Nyanza", timeDuration: "1hr 30min", price: "300Rwf" },
  { routeFrom: "Nyabugogo", routeTo: "Huye", timeDuration: "3hrs", price: "300Rwf" },
  { routeFrom: "Nyabugogo", routeTo: "Rubavu", timeDuration: "4hrs", price: "300Rwf" },
  { routeFrom: "Nyabugogo", routeTo: "Nyanza", timeDuration: "1hr 30min", price: "300Rwf" },
  { routeFrom: "Nyabugogo", routeTo: "Muhanga", timeDuration: "1hr", price: "300Rwf" },
  { routeFrom: "Nyabugogo", routeTo: "Gaseke", timeDuration: "1hr", price: "300Rwf" },
];

const TopSearch = () => {
  return (
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
                <p className="facility-text">Snacks</p>
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
              <h1 className="price">Rs. {route.price}</h1>
              <button className="reserve-btn">Reserve Seat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearch;