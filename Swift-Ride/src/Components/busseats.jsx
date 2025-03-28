import React, { useEffect, useState } from "react";
import { MdOutlineChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Styles/seats.css"; 
import ErrorMsg from "./error"; // Ensure this component is defined or imported

const Seats = () => {
  // Predefined bus seat data with more detailed information
  const busSeatData = [
    { id: 'B1', status: 'booked', price: 1600 },
    { id: 'B3', status: 'booked', price: 1600 },
    { id: 'B5', status: 'booked', price: 1600 },
    { id: 'B7', status: 'available', price: 1600 },
    { id: 'B9', status: 'available', price: 1600 },
    { id: 'B11', status: 'booked', price: 1600 },
    { id: 'B13', status: 'booked', price: 1600 },
    { id: 'B15', status: 'available', price: 1600 },
    { id: 'B17', status: 'available', price: 1600 },
    { id: 'B2', status: 'booked', price: 1600 },
    { id: 'B4', status: 'booked', price: 1600 },
    { id: 'B6', status: 'available', price: 1600 },
    { id: 'B8', status: 'available', price: 1600 },
    { id: 'B10', status: 'available', price: 1600 },
    { id: 'B12', status: 'booked', price: 1600 },
    { id: 'B14', status: 'available', price: 1600 },
    { id: 'B16', status: 'available', price: 1600 },
    { id: 'B18', status: 'available', price: 1600 },
    { id: 'A1', status: 'booked', price: 1600 },
    { id: 'A3', status: 'available', price: 1600 },
    { id: 'A5', status: 'booked', price: 1600 },
    { id: 'A7', status: 'booked', price: 1600 },
    { id: 'A9', status: 'available', price: 1600 },
    { id: 'A11', status: 'booked', price: 1600 },
    { id: 'A13', status: 'booked', price: 1600 },
    { id: 'A15', status: 'available', price: 1600 },
    { id: 'A17', status: 'available', price: 1600 },
    { id: 'A2', status: 'available', price: 1600 },
    { id: 'A4', status: 'available', price: 1600 },
    { id: 'A6', status: 'booked', price: 1600 },
    { id: 'A8', status: 'available', price: 1600 },
    { id: 'A10', status: 'booked', price: 1600 },
    { id: 'A12', status: 'booked', price: 1600 },
    { id: 'A14', status: 'available', price: 1600 },
    { id: 'A16', status: 'available', price: 1600 },
    { id: 'A18', status: 'available', price: 1600 },
  ];

  // State management
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  // Journey details (based on screenshot)
  const journeyDetails = {
    from: {
      location: "New Bus park",
      time: "Kathmandu (06:15 pm)"
    },
    to: {
      location: "Chauntha",
      time: "Pyuthan (08:45 am)"
    }
  };

  // Seat selection handler
  const handleSeatClick = (seatId) => {
    const selectedSeat = busSeatData.find((seat) => seat.id === seatId);
    if (selectedSeat.status === "booked") {
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        if (prevSelectedSeats.length >= 10) {
          setShowError(true);
          return prevSelectedSeats;
        } else {
          return [...prevSelectedSeats, seatId];
        }
      }
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const basicFare = 1600;
    const selectedSeatCount = selectedSeats.length;
    return basicFare * selectedSeatCount;
  };

  // Error message effect
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="container_seats">
      <div className="seat-layout">
        <div className="seat-container">
          <p className="seat-message">Click on available seats to reserve your seat.</p>
          <div className="seat-grid">
            <div className="steering-wheel">
              <GiSteeringWheel className="icon-red rotate" />
            </div>
            <div className="seat-rows">
              {busSeatData.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.status === "booked" ? "booked" : selectedSeats.includes(seat.id) ? "selected" : "available"}`}
                  onClick={() => handleSeatClick(seat.id)}
                >
                  <h6 className="seat-id">{seat.id}</h6>
                  <MdOutlineChair className="seat-icon rotate" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="selection-summary">
        <div className="destination-details">
          <h3>Your Destination</h3>
          <div className="route-info">
            <div className="from-location">
              <span>From</span>
              <p>{journeyDetails.from.location}</p>
              <p>{journeyDetails.from.time}</p>
            </div>
            <div className="to-location">
              <span>To</span>
              <p>{journeyDetails.to.location}</p>
              <p>{journeyDetails.to.time}</p>
            </div>
            <a href="#" className="change-route-link">Change route</a>
          </div>
        </div>

        <div className="selected-seats-section">
          <h1 className="summary-title">Selected Seats</h1>
          <div className="selected-seats">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seatId) => (
                <span key={seatId} className="seat-tag">
                  {seatId}
                </span>
              ))
            ) : (
              <p className="no-seat-selected">No seats selected</p>
            )}
          </div>
          <div className="fare-details">
            <div className="fare-row">
              <span>Basic Fare:</span>
              <span>NPR. 1600</span>
            </div>
            <div className="fare-row total">
              <span>Total Price:</span>
              <span>NPR. {calculateTotalPrice()} <br/><small>(Including all taxes)</small></span>
            </div>
          </div>
          <Link 
            to='Checkout' 
            className={`checkout-button ${selectedSeats.length > 0 ? "active" : "disabled"}`}
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
      {showError && <ErrorMsg message="You can't select more than 10 seats!" />}
    </div>
  );
};

export default Seats;