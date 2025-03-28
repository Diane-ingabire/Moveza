import React, { useState } from 'react';
import '../Styles/payment.css';

const BookingForm = () => {
  const [seats, setSeats] = useState([
    { id: 'A1', booked: false }, { id: 'A2', booked: false }, { id: 'A3', booked: false },
    { id: 'A4', booked: false }, { id: 'A5', booked: false }, { id: 'B1', booked: false },
    { id: 'B2', booked: false }, { id: 'B3', booked: false }, { id: 'B4', booked: false },
    { id: 'B5', booked: false }
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({ name: '', paymentMethod: '' });
  const [bookingStage, setBookingStage] = useState('seat-selection');
  const [error, setError] = useState('');

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
      setError('');
    } else if (selectedSeats.length < 4) {
      setSelectedSeats([...selectedSeats, seatId]);
      setError('');
    } else {
      setError('You can only select up to 4 seats.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const proceedToBooking = () => {
    if (selectedSeats.length > 0) {
      setBookingStage('booking-form');
      setError('');
    } else {
      setError('Please select at least one seat.');
    }
  };

  const submitBooking = () => {
    if (!bookingDetails.name || !bookingDetails.paymentMethod) {
      setError('Please fill in all booking details.');
      return;
    }
    const updatedSeats = seats.map(seat => 
      selectedSeats.includes(seat.id) ? { ...seat, booked: true } : seat
    );
    setSeats(updatedSeats);
    setBookingStage('booking-confirmed');
    setError('');
  };

  const cancelBooking = () => {
    setSelectedSeats([]);
    setBookingDetails({ name: '', paymentMethod: '' });
    setBookingStage('seat-selection');
    setError('');
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <h2>
            {bookingStage === 'seat-selection' && 'Select Your Seats'}
            {bookingStage === 'booking-form' && 'Booking Details'}
            {bookingStage === 'booking-confirmed' && 'Booking Confirmed'}
          </h2>
        </div>
        
        <div className="booking-content">
          {error && <div className="error-message">{error}</div>}

          {bookingStage === 'seat-selection' && (
            <>
              <div className="seat-grid">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatSelect(seat.id)}
                    disabled={seat.booked}
                    className={`seat-button ${seat.booked ? 'booked' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
              <div className="booking-footer">
                <span>Selected Seats: {selectedSeats.join(', ')}</span>
                <button onClick={proceedToBooking} className="proceed-button">Proceed to Booking</button>
              </div>
            </>
          )}

          {bookingStage === 'booking-form' && (
            <div className="form-container">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={bookingDetails.name}
                onChange={handleInputChange}
                className="input-field"
              />
              <select 
                name="paymentMethod"
                value={bookingDetails.paymentMethod}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select Payment Method</option>
                <option value="tap-and-go">Tap and Go</option>
                <option value="mobile-money">Mobile Money</option>
              </select>
              <div className="form-buttons">
                <button onClick={cancelBooking} className="cancel-button">Cancel</button>
                <button onClick={submitBooking} className="confirm-button">Confirm Booking</button>
              </div>
            </div>
          )}

          {bookingStage === 'booking-confirmed' && (
            <div className="confirmation-container">
              <div className="success-message">
                <p><strong>Booking Successful!</strong></p>
                <p>Your seats {selectedSeats.join(', ')} have been booked.</p>
              </div>
              <button className="invoice-button">View Invoice</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
