import React, { useState } from 'react';
import { X, Calendar, Map, Clock, CreditCard, Users } from 'lucide-react';
import '../Dashboard/dashboardstyles/bookOverlay.css';

const BookingOverlay = ({ bus, onClose, onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const totalAmount = bus.price * formData.numberOfSeats;
    
    const bookingData = {
        user: "USER_ID_HERE", // Replace with actual logged-in user ID
        bus: bus._id,
        departurePlace: formData.departurePlace,
        destination: formData.destination,
        pickingStation: formData.pickingStation,
        numberOfSeats: formData.numberOfSeats,
        totalAmountPaid: totalAmount,
        paymentStatus: formData.paymentMethod === "card" ? "paid" : "unpaid"
    };

    try {
        const response = await fetch("http://localhost:3000/booking/create", { // Update with your backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Booking Successful!");
            onClose(); // Close the form after booking
        } else {
            alert(`Booking Failed: ${data.error}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while booking.");
    }
};


  // State for form fields
  const [formData, setFormData] = useState({
    departurePlace: bus?.departurePlace || '',
    destination: bus?.destination || '',
    pickingStation: '',
    numberOfSeats: 1,
    paymentMethod: 'card'
  });
  
  // State for multi-step form
  const [step, setStep] = useState(1);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'numberOfSeats' ? parseInt(value) : value
    });
  };
  
  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Calculate total amount based on bus price and number of seats
  //   const totalAmount = bus.price * formData.numberOfSeats;
    
  //   // Prepare booking data from form and bus
  //   const bookingData = {
  //     bus: bus._id,
  //     departurePlace: formData.departurePlace,
  //     destination: formData.destination,
  //     pickingStation: formData.pickingStation,
  //     numberOfSeats: formData.numberOfSeats,
  //     totalAmountPaid: totalAmount,
  //     // Other fields will be set by backend
  //   };
    
  //   onSubmit(bookingData);
  // };
  
  // Next step in form
  const nextStep = () => setStep(step + 1);
  
  // Previous step in form
  const prevStep = () => setStep(step - 1);
  
  return (
    <div className="overlay">
      <div className="overlay-content scrollable-overlay">
        {/* Fixed header section */}
        <div className="overlay-fixed-header">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="close-button"
          >
            <X size={24} />
          </button>
          
          {/* Header */}
          <div className="overlay-header">
            <h2 className="header-title">Book Your Ride</h2>
            <p className="header-subtitle">{bus?.busName} - {bus?.busNumber}</p>
          </div>
          
          {/* Progress indicator */}
          <div className="progress-indicators">
            {[1, 2, 3].map((i) => (
              <div key={i} className="progress-step">
                <div className={`step-circle ${step >= i ? 'active' : ''}`}>
                  {i}
                </div>
                <span className="step-label">
                  {i === 1 ? 'Details' : i === 2 ? 'Seats' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scrollable content section */}
        <div className="overlay-scrollable-content">
          {/* Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">
                    <Map size={16} className="icon" /> Departure Place
                  </label>
                  <input
                    type="text"
                    name="departurePlace"
                    value={formData.departurePlace}
                    onChange={handleChange}
                    disabled={bus?.departurePlace}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <Map size={16} className="icon" /> Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    disabled={bus?.destination}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <Map size={16} className="icon" /> Picking Station
                  </label>
                  <select
                    name="pickingStation"
                    value={formData.pickingStation}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a picking station</option>
                    {bus?.stations?.map((station, idx) => (
                      <option key={idx} value={station}>
                        {station}
                      </option>
                    )) || [
                      <option key="central" value="Central Station">Remera</option>,
                      <option key="north" value="North Terminal">North Terminal</option>,
                      <option key="east" value="East Gateway">East Gateway</option>
                    ]}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} className="icon" /> Departure Date
                  </label>
                  <div className="static-field">
                    <Calendar size={16} className="field-icon" />
                    <span>{bus?.departureDate || new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <Clock size={16} className="icon" /> Departure Time
                  </label>
                  <div className="static-field">
                    <Clock size={16} className="field-icon" />
                    <span>{bus?.departureTime || "09:00 AM"}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Seats Selection */}
            {step === 2 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">
                    <Users size={16} className="icon" /> Number of Seats
                  </label>
                  <input
                    type="number"
                    name="numberOfSeats"
                    value={formData.numberOfSeats}
                    onChange={handleChange}
                    min="1"
                    max={bus?.availableSeats || 10}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="seat-selection">
                  <h3 className="section-title">Seat Selection</h3>
                  <div className="seat-grid">
                    {Array.from({ length: 20 }).map((_, idx) => {
                      const isTaken = [3, 7, 10, 15, 18].includes(idx);
                      const isSelected = idx < formData.numberOfSeats;
                      return (
                        <div
                          key={idx}
                          className={`seat ${isTaken ? 'taken' : isSelected ? 'selected' : 'available'}`}
                        >
                          {idx + 1}
                        </div>
                      );
                    })}
                  </div>
                  <p className="seat-legend">
                    <span className="legend-item taken"></span> Taken
                    <span className="legend-item selected"></span> Selected
                    <span className="legend-item available"></span> Available
                  </p>
                </div>
                
                <div className="price-summary">
                  <h3 className="section-title">Price Summary</h3>
                  <div className="price-row">
                    <span className="price-label">Ticket price x {formData.numberOfSeats}</span>
                    <span className="price-value">${(bus?.price || 25) * formData.numberOfSeats}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">Booking fee</span>
                    <span className="price-value">$2.00</span>
                  </div>
                  <div className="price-row total">
                    <span className="price-label">Total</span>
                    <span className="price-value">${(bus?.price || 25) * formData.numberOfSeats + 2}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">
                    <CreditCard size={16} className="icon" /> Payment Method
                  </label>
                  <div className="payment-options">
                    <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="option-label">Tap and Go card</span>
                      <div className="card-icons">
                        <div className="card-icon visa"></div>
                        
                      </div>
                    </label>
                    
                    <label className={`payment-option ${formData.paymentMethod === 'mobile' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={formData.paymentMethod === 'mobile'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="option-label">Mobile Payment</span>
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="payment-details card-payment">
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    
                    <div className="expiry-cvv-group">
                      <div className="expiry-field">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="form-input"
                        />
                      </div>
                      
                      <div className="cvv-field">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'mobile' && (
                  <div className="payment-details mobile-payment">
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="form-input"
                      />
                    </div>
                  </div>
                )}
                
                <div className="total-amount">
                  <div className="amount-row">
                    <span className="amount-label">Total Amount:</span>
                    <span className="amount-value">${(bus?.price || 25) * formData.numberOfSeats + 2}</span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Fixed footer with navigation buttons */}
        <div className="overlay-fixed-footer">
          <div className="form-navigation">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="back-button"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="continue-button"
              >
                Continue
              </button>
            ) : (
              <button 
                type="submit"
                onClick={handleSubmit}
                className="confirm-button"
              > Confirm Booking
               
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverlay;