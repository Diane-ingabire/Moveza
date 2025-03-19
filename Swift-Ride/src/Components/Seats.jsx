// BusBooking.jsx
import React, { useState } from 'react';
import '../Styles/seats.css';

const Seats = () => {
  // Initial seat status (available, booked, selected)
  const [seats, setSeats] = useState({
    A1: 'booked', A2: 'available', A3: 'available', A4: 'available', A5: 'booked', A6: 'booked',
    A7: 'booked', A8: 'booked', A9: 'booked', A10: 'booked', A11: 'booked', A12: 'booked',
    A13: 'booked', A14: 'booked', A15: 'booked', A16: 'booked', A17: 'booked', A18: 'booked',
    B1: 'booked', B2: 'booked', B3: 'booked', B4: 'booked', B5: 'booked', B6: 'available',
    B7: 'available', B8: 'available', B9: 'booked', B10: 'booked', B11: 'booked', B12: 'booked',
    B13: 'booked', B14: 'booked', B15: 'booked', B16: 'booked', B17: 'booked', B18: 'booked',
  });

  // Selected seats
  const [selectedSeats, setSelectedSeats] = useState(['A2', 'A3', 'A4', 'B6', 'B7', 'B8', 'A8']);

  // Function to handle seat selection
  const handleSeatClick = (seatId) => {
    if (seats[seatId] === 'booked') return;
    
    const newSeats = { ...seats };
    if (seats[seatId] === 'available') {
      newSeats[seatId] = 'selected';
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      newSeats[seatId] = 'available';
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    }
    
    setSeats(newSeats);
  };

  // Calculate total price
  const baseFare = 1600;
  const totalPrice = selectedSeats.length * baseFare;

  return (
    <div className="bus-booking">
      <div className="header">
        <h1>Bus Details</h1>
      </div>
      
      <div className="content">
        <div className="seat-layout">
          <div className="seat-selection-info">
            <p>Click on available seats to reserve your seat.</p>
          </div>
          
          <div className="seat-map">
            <div className="aisle">
              {/* Driver's seat */}
              <div className="driver-seat">
                <span className="driver-icon">🚌</span>
              </div>
              
              {/* Rows */}
              <div className="seat-rows">
                {/* Row 1 */}
                <div className="seat-row">
                  <div className={`seat ${seats.B1}`} onClick={() => handleSeatClick('B1')}>
                    <span>B1</span>
                  </div>
                  <div className={`seat ${seats.B3}`} onClick={() => handleSeatClick('B3')}>
                    <span>B3</span>
                  </div>
                  <div className={`seat ${seats.B5}`} onClick={() => handleSeatClick('B5')}>
                    <span>B5</span>
                  </div>
                  <div className={`seat ${seats.B7}`} onClick={() => handleSeatClick('B7')}>
                    <span>B7</span>
                  </div>
                  <div className={`seat ${seats.B9}`} onClick={() => handleSeatClick('B9')}>
                    <span>B9</span>
                  </div>
                  <div className={`seat ${seats.B11}`} onClick={() => handleSeatClick('B11')}>
                    <span>B11</span>
                  </div>
                  <div className={`seat ${seats.B13}`} onClick={() => handleSeatClick('B13')}>
                    <span>B13</span>
                  </div>
                  <div className={`seat ${seats.B15}`} onClick={() => handleSeatClick('B15')}>
                    <span>B15</span>
                  </div>
                  <div className={`seat ${seats.B17}`} onClick={() => handleSeatClick('B17')}>
                    <span>B17</span>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="seat-row">
                  <div className={`seat ${seats.B2}`} onClick={() => handleSeatClick('B2')}>
                    <span>B2</span>
                  </div>
                  <div className={`seat ${seats.B4}`} onClick={() => handleSeatClick('B4')}>
                    <span>B4</span>
                  </div>
                  <div className={`seat ${seats.B6}`} onClick={() => handleSeatClick('B6')}>
                    <span>B6</span>
                  </div>
                  <div className={`seat ${seats.B8}`} onClick={() => handleSeatClick('B8')}>
                    <span>B8</span>
                  </div>
                  <div className={`seat ${seats.B10}`} onClick={() => handleSeatClick('B10')}>
                    <span>B10</span>
                  </div>
                  <div className={`seat ${seats.B12}`} onClick={() => handleSeatClick('B12')}>
                    <span>B12</span>
                  </div>
                  <div className={`seat ${seats.B14}`} onClick={() => handleSeatClick('B14')}>
                    <span>B14</span>
                  </div>
                  <div className={`seat ${seats.B16}`} onClick={() => handleSeatClick('B16')}>
                    <span>B16</span>
                  </div>
                  <div className={`seat ${seats.B18}`} onClick={() => handleSeatClick('B18')}>
                    <span>B18</span>
                  </div>
                </div>
                
                {/* Aisle indicator */}
                <div className="aisle-indicator"></div>
                
                {/* Row 3 */}
                <div className="seat-row">
                  <div className={`seat ${seats.A1}`} onClick={() => handleSeatClick('A1')}>
                    <span>A1</span>
                  </div>
                  <div className={`seat ${seats.A3}`} onClick={() => handleSeatClick('A3')}>
                    <span>A3</span>
                  </div>
                  <div className={`seat ${seats.A5}`} onClick={() => handleSeatClick('A5')}>
                    <span>A5</span>
                  </div>
                  <div className={`seat ${seats.A7}`} onClick={() => handleSeatClick('A7')}>
                    <span>A7</span>
                  </div>
                  <div className={`seat ${seats.A9}`} onClick={() => handleSeatClick('A9')}>
                    <span>A9</span>
                  </div>
                  <div className={`seat ${seats.A11}`} onClick={() => handleSeatClick('A11')}>
                    <span>A11</span>
                  </div>
                  <div className={`seat ${seats.A13}`} onClick={() => handleSeatClick('A13')}>
                    <span>A13</span>
                  </div>
                  <div className={`seat ${seats.A15}`} onClick={() => handleSeatClick('A15')}>
                    <span>A15</span>
                  </div>
                  <div className={`seat ${seats.A17}`} onClick={() => handleSeatClick('A17')}>
                    <span>A17</span>
                  </div>
                </div>
                
                {/* Row 4 */}
                <div className="seat-row">
                  <div className={`seat ${seats.A2}`} onClick={() => handleSeatClick('A2')}>
                    <span>A2</span>
                  </div>
                  <div className={`seat ${seats.A4}`} onClick={() => handleSeatClick('A4')}>
                    <span>A4</span>
                  </div>
                  <div className={`seat ${seats.A6}`} onClick={() => handleSeatClick('A6')}>
                    <span>A6</span>
                  </div>
                  <div className={`seat ${seats.A8}`} onClick={() => handleSeatClick('A8')}>
                    <span>A8</span>
                  </div>
                  <div className={`seat ${seats.A10}`} onClick={() => handleSeatClick('A10')}>
                    <span>A10</span>
                  </div>
                  <div className={`seat ${seats.A12}`} onClick={() => handleSeatClick('A12')}>
                    <span>A12</span>
                  </div>
                  <div className={`seat ${seats.A14}`} onClick={() => handleSeatClick('A14')}>
                    <span>A14</span>
                  </div>
                  <div className={`seat ${seats.A16}`} onClick={() => handleSeatClick('A16')}>
                    <span>A16</span>
                  </div>
                  <div className={`seat ${seats.A18}`} onClick={() => handleSeatClick('A18')}>
                    <span>A18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="seat-indicators">
            <div className="seat-indicator">
              <div className="indicator available"></div>
              <span>Available</span>
            </div>
            <div className="seat-indicator">
              <div className="indicator booked"></div>
              <span>Booked</span>
            </div>
            <div className="seat-indicator">
              <div className="indicator selected"></div>
              <span>Selected</span>
            </div>
            <div className="seat-price">
              <span>NPR. 1600</span>
            </div>
          </div>
        </div>
        
        <div className="booking-details">
          <div className="destination-info">
            <h3>Your Destination</h3>
            <div className="route-details">
              <div className="from-to">
                <div className="from">
                  <p>From <span>(New Bus park)</span></p>
                  <p className="city">Kathmandu <span>(06:15 pm)</span></p>
                </div>
                <div className="to">
                  <p>To <span>(Chauntha)</span></p>
                  <p className="city">Pyuthan <span>(08:45 am)</span></p>
                </div>
              </div>
              <div className="change-route">
                <button>Change route</button>
              </div>
            </div>
            
            <div className="selected-seats-info">
              <h3>Selected Seats</h3>
              <div className="selected-seats-list">
                <div className="non-refundable">NON-REFUNDABLE</div>
                <div className="seat-numbers">
                  {selectedSeats.map(seat => (
                    <span key={seat} className="seat-number">{seat}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="fare-details">
              <h3>Fare Details</h3>
              <div className="fare-info">
                <div className="fare-row">
                  <span>Basic Fare:</span>
                  <span>NPR. {baseFare}</span>
                </div>
                <div className="fare-row total">
                  <span>Total Price:</span>
                  <span>NPR {totalPrice}</span>
                </div>
                <div className="tax-info">
                  <span>(Including all taxes)</span>
                </div>
              </div>
            </div>
            
            <div className="checkout-button">
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-seats">
        <p>This is just a sample text for the demo purpose. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quae repudiandae eum unde, dolor dignissimos consectetur sequi recusandae minima nisi voluptatem eius, ex maxime quibusdam animi, voluptas rem cumque! At! Provident quae repudiandae eum unde, dolor dignissimos consectetur sequi.</p>
      </div>
    </div>
  );
};

export default Seats;