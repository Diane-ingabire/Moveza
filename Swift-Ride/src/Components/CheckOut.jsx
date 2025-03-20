import React, { useState } from 'react';
import '../Styles/checkout.css'

const CheckOut = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bookingNumber: '4645645',
    pickupStation: 'Swayambhu'
  });
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mastercard');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
 
  
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setCurrentStep(2);
  };
  
  const ticketDetails = {
    departureFrom: 'Kathmandu',
    departureTime: '06:15 pm',
    arrivalTo: 'Pokhara',
    arrivalTime: '06:45 am',
    busNumber: 'Ba. 2 Kha 9704',
    seats: ['A2', 'A3', 'A4', 'B6'],
    totalPrice: 'NPR 6400'
  };
  
  return (
    <div className="bus-booking-container">
      <div className="header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1>Checkout</h1>
        </div>
      </div>
      
      <div className="main-content">
        <div className="left-side">
          {currentStep === 1 ? (
            <form onSubmit={handleSubmit}>
              <h2>Passenger Information</h2>
              
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Ram Bahadur Ghale"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="e.g. rbamror@example.com"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="e.g. +977-9876543210"
                  required
                />
              </div>
              
              <button type="submit" className="btn-submit">
                PROCEED TO PAY →
              </button>
            </form>
          ) : (
            <div>
              <h2>Payment</h2>
              <div className="input-group">
                <label>Booking Number</label>
                <input 
                  type="text" 
                  value={formData.bookingNumber} 
                  readOnly
                />
              </div>
              
              <div className="input-group">
                <label>Pickup Station</label>
                <select 
                  name="pickupStation" 
                  value={formData.pickupStation} 
                  onChange={handleInputChange}
                >
                  <option value="Swayambhu">Nyabugogo</option>
                  <option value="Kalanki">Huye</option>
                  <option value="Balkhu"></option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Select Payment Method</label>
                <div className="payment-methods">
                  <div 
                    className={`payment-method ${selectedPaymentMethod === 'mastercard' ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodSelect('mastercard')}
                  >
                    <div className="payment-method-info">
                      <div className="card"></div>
                      <div className="payment-info">
                        <div>Ram Bdr. Ghale</div>
                        <div>•••• 6888</div>
                      </div>
                    </div>
                    <div className="checkbox">
                      {selectedPaymentMethod === 'mastercard' && <div className="checked"></div>}
                    </div>
                  </div>
                </div>
                <div 
                  className={`payment-method ${selectedPaymentMethod === 'visa' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('visa')}
                >
                  <div className="payment-method-info">
                    <div className="card"></div>
                    <div className="payment-info">
                      <div>Ram Bdr. Ghale</div>
                      <div>•••• 8989</div>
                    </div>
                  </div>
                  <div className="checkbox">
                    {selectedPaymentMethod === 'visa' && <div className="checked"></div>}
                  </div>
                </div>
              </div>
              <button className="btn-submit">
                PROCEED TO PAY →
              </button>
            </div>
          )}
        </div>
        
        <div className="right-side">
          <h2>Your Ticket Report Status</h2>
          
          <div className="ticket-details">
            <h3>Your Destination</h3>
            <div className="destination-details">
              <div>
                <div>From (New Buspark)</div>
                <div>{ticketDetails.departureFrom} ({ticketDetails.departureTime})</div>
              </div>
              <div>
                <div>To (Pokhara)</div>
                <div>{ticketDetails.arrivalTo} ({ticketDetails.arrivalTime})</div>
              </div>
            </div>
            <div className="bus-number">
              <div>Bus No.:</div>
              <div>{ticketDetails.busNumber}</div>
            </div>
          </div>
          
          <div className="seats">
            <h3>Your Seats</h3>
            <div className="seats-info">
              {ticketDetails.seats.map((seat, index) => (
                <div key={index} className="seat">{seat}</div>
              ))}
            </div>
          </div>
          
          <div className="fare">
            <h3>Total Fare Price</h3>
            <div className="fare-details">
              <div>Total Price:</div>
              <div>{ticketDetails.totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
      
  
    </div>
  );
};

export default CheckOut;
