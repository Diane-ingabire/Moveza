import React, { useState, useEffect } from 'react';
import './AdminStyles/managepassenger.css';
import { FaUser, FaSearch, FaFilter, FaEllipsisV, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle, FaDownload, FaSms, FaEnvelope } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import { MdCancel, MdNotifications } from 'react-icons/md';
import { BsFillPeopleFill, BsBusFront } from 'react-icons/bs';

const ManagePassengers = () => {
  // States
  const [passengers, setPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [actionPassengerId, setActionPassengerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    cancelled: 0,
    completed: 0
  });

  // Mock data - replace with actual API calls in production
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockPassengers = [
        {
          id: 1,
          name: 'John Doe',
          phone: '+250789123456',
          email: 'john.doe@example.com',
          status: 'active',
          bookings: [
            {
              id: 'BK00123',
              route: 'Kigali - Huye',
              date: '2025-03-25',
              time: '08:30',
              seatNumber: 'A12',
              price: 5000,
              status: 'confirmed'
            }
          ],
          registeredOn: '2024-10-15',
          lastActive: '2025-03-21'
        },
        {
          id: 2,
          name: 'Jane Smith',
          phone: '+250722987654',
          email: 'jane.smith@example.com',
          status: 'active',
          bookings: [
            {
              id: 'BK00124',
              route: 'Kigali - Musanze',
              date: '2025-03-22',
              time: '10:00',
              seatNumber: 'B05',
              price: 4000,
              status: 'confirmed'
            },
            {
              id: 'BK00135',
              route: 'Musanze - Kigali',
              date: '2025-03-29',
              time: '16:30',
              seatNumber: 'C09',
              price: 4000,
              status: 'pending'
            }
          ],
          registeredOn: '2024-11-20',
          lastActive: '2025-03-20'
        },
        {
          id: 3,
          name: 'David Mugabo',
          phone: '+250733456789',
          email: 'david.m@example.com',
          status: 'inactive',
          bookings: [
            {
              id: 'BK00187',
              route: 'Kigali - Nyagatare',
              date: '2025-02-15',
              time: '09:00',
              seatNumber: 'D15',
              price: 6000,
              status: 'cancelled'
            }
          ],
          registeredOn: '2025-01-10',
          lastActive: '2025-02-15'
        },
        {
          id: 4,
          name: 'Claire Uwase',
          phone: '+250788654321',
          email: 'claire.u@example.com',
          status: 'active',
          bookings: [
            {
              id: 'BK00201',
              route: 'Kigali - Gisenyi',
              date: '2025-04-01',
              time: '07:00',
              seatNumber: 'A08',
              price: 7000,
              status: 'confirmed'
            }
          ],
          registeredOn: '2024-12-05',
          lastActive: '2025-03-18'
        },
        {
          id: 5,
          name: 'Robert Karemera',
          phone: '+250799887766',
          email: 'robert.k@example.com',
          status: 'active',
          bookings: [
            {
              id: 'BK00212',
              route: 'Kigali - Huye',
              date: '2025-03-24',
              time: '14:30',
              seatNumber: 'C14',
              price: 5000,
              status: 'confirmed'
            },
            {
              id: 'BK00215',
              route: 'Huye - Kigali',
              date: '2025-03-26',
              time: '09:30',
              seatNumber: 'B11',
              price: 5000,
              status: 'confirmed'
            }
          ],
          registeredOn: '2025-02-01',
          lastActive: '2025-03-22'
        }
      ];

      // Calculate statistics
      const totalPassengers = mockPassengers.length;
      const activePassengers = mockPassengers.filter(p => p.status === 'active').length;
      const inactivePassengers = mockPassengers.filter(p => p.status === 'inactive').length;
      
      const completedBookings = mockPassengers.reduce((total, passenger) => 
        total + passenger.bookings.filter(b => 
          new Date(b.date) < new Date() && b.status === 'confirmed'
        ).length, 0);
      
      const cancelledBookings = mockPassengers.reduce((total, passenger) => 
        total + passenger.bookings.filter(b => b.status === 'cancelled').length, 0);

      setStats({
        total: totalPassengers,
        active: activePassengers,
        inactive: inactivePassengers,
        completed: completedBookings,
        cancelled: cancelledBookings
      });

      setPassengers(mockPassengers);
      setLoading(false);
    }, 1000);
  }, []);

  // Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleViewPassenger = (passenger) => {
    setSelectedPassenger(passenger);
    setShowPassengerModal(true);
  };

  const handleActionMenu = (passengerId) => {
    setActionPassengerId(passengerId);
    setShowActionModal(true);
  };

  const handleCloseModal = () => {
    setShowPassengerModal(false);
    setShowActionModal(false);
    setShowNotificationModal(false);
    setSelectedPassenger(null);
    setActionPassengerId(null);
  };

  const handleSendNotification = (passengerId) => {
    setActionPassengerId(passengerId);
    setShowNotificationModal(true);
    setShowActionModal(false);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Simulate sending notification
    setNotification({
      show: true,
      message: 'Notification sent successfully',
      type: 'success'
    });
    setShowNotificationModal(false);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleDeletePassenger = (passengerId) => {
    // Add confirmation dialog in real implementation
    setPassengers(passengers.filter(p => p.id !== passengerId));
    setShowActionModal(false);
    
    setNotification({
      show: true,
      message: 'Passenger deleted successfully',
      type: 'success'
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCancelBooking = (passengerId, bookingId) => {
    const updatedPassengers = passengers.map(passenger => {
      if (passenger.id === passengerId) {
        const updatedBookings = passenger.bookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, status: 'cancelled' };
          }
          return booking;
        });
        return { ...passenger, bookings: updatedBookings };
      }
      return passenger;
    });

    setPassengers(updatedPassengers);
    setSelectedPassenger(updatedPassengers.find(p => p.id === passengerId));
    
    setNotification({
      show: true,
      message: 'Booking cancelled successfully',
      type: 'success'
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Filter passengers based on search term and filter type
  const filteredPassengers = passengers.filter(passenger => {
    const matchesSearch = 
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.phone.includes(searchTerm);
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'active') return matchesSearch && passenger.status === 'active';
    if (filterType === 'inactive') return matchesSearch && passenger.status === 'inactive';
    
    return matchesSearch;
  });

  // Pagination
  const passengersPerPage = 5;
  const indexOfLastPassenger = currentPage * passengersPerPage;
  const indexOfFirstPassenger = indexOfLastPassenger - passengersPerPage;
  const currentPassengers = filteredPassengers.slice(indexOfFirstPassenger, indexOfLastPassenger);
  const totalPages = Math.ceil(filteredPassengers.length / passengersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination controls
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn-adminbus-pagination ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="adminbus-pagination">
        <button
          className="btn-adminbus-pagination"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &laquo;
        </button>
        {pages}
        <button
          className="btn-adminbus-pagination"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="adminbus-manage-passengers-container">
      {/* Notification message */}
      {notification.show && (
        <div className={`adminbus-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="adminbus-top-section">
        <h1 className="adminbus-section-title">Manage Passengers</h1>
        <p className="adminbus-section-description">
          View and manage all registered passengers, their bookings, and send notifications.
        </p>
      </div>

      {/* Stats section */}
      <div className="adminbus-stats-container">
        <div className="adminbus-stat-card">
          <div className="adminbus-stat-icon total">
            <BsFillPeopleFill />
          </div>
          <div className="adminbus-stat-details">
            <h3>Total Passengers</h3>
            <p className="adminbus-stat-number">{stats.total}</p>
          </div>
        </div>

        <div className="adminbus-stat-card">
          <div className="adminbus-stat-icon active">
            <FaUser />
          </div>
          <div className="adminbus-stat-details">
            <h3>Active Passengers</h3>
            <p className="adminbus-stat-number">{stats.active}</p>
          </div>
        </div>

        <div className="adminbus-stat-card">
          <div className="adminbus-stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="adminbus-stat-details">
            <h3>Completed Trips</h3>
            <p className="adminbus-stat-number">{stats.completed}</p>
          </div>
        </div>

        <div className="adminbus-stat-card">
          <div className="adminbus-stat-icon cancelled">
            <MdCancel />
          </div>
          <div className="adminbus-stat-details">
            <h3>Cancelled Bookings</h3>
            <p className="adminbus-stat-number">{stats.cancelled}</p>
          </div>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="adminbus-filter-container">
        <div className="adminbus-search-box">
          <FaSearch className="adminbus-search-icon" />
          <input
            type="text"
            placeholder="Search passengers by name, email or phone..."
            value={searchTerm}
            onChange={handleSearch}
            className="adminbus-search-input"
          />
        </div>

        <div className="adminbus-filter-buttons">
          <button
            className={`btn-adminbus-filter ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All
          </button>
          <button
            className={`btn-adminbus-filter ${filterType === 'active' ? 'active' : ''}`}
            onClick={() => handleFilter('active')}
          >
            Active
          </button>
          <button
            className={`btn-adminbus-filter ${filterType === 'inactive' ? 'active' : ''}`}
            onClick={() => handleFilter('inactive')}
          >
            Inactive
          </button>
          <button className="btn-adminbus-refresh" onClick={() => window.location.reload()}>
            <BiRefresh /> Refresh
          </button>
        </div>
      </div>

      {/* Passengers table */}
      <div className="adminbus-table-container">
        {loading ? (
          <div className="adminbus-loading">
            <div className="adminbus-spinner"></div>
            <p>Loading passengers data...</p>
          </div>
        ) : currentPassengers.length === 0 ? (
          <div className="adminbus-no-data">
            <FaUser size={48} opacity={0.3} />
            <p>No passengers found</p>
          </div>
        ) : (
          <table className="adminbus-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact Information</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPassengers.map((passenger) => (
                <tr key={passenger.id}>
                  <td className="adminbus-passenger-id">#{passenger.id}</td>
                  <td>{passenger.name}</td>
                  <td>
                    <div className="adminbus-contact-info">
                      <div>{passenger.phone}</div>
                      <div>{passenger.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`adminbus-status-badge ${passenger.status}`}>
                      {passenger.status}
                    </span>
                  </td>
                  <td>
                    <div className="adminbus-bookings-count">
                      <span className="adminbus-total-bookings">{passenger.bookings.length}</span>
                      <button 
                        className="btn-adminbus-view-details"
                        onClick={() => handleViewPassenger(passenger)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                  <td>{passenger.lastActive}</td>
                  <td className="adminbus-actions">
                    <button className="btn-adminbus-action" onClick={() => handleSendNotification(passenger.id)}>
                      <MdNotifications />
                    </button>
                    <button className="btn-adminbus-action" onClick={() => handleViewPassenger(passenger)}>
                      <FaEdit />
                    </button>
                    <button className="btn-adminbus-action-menu" onClick={() => handleActionMenu(passenger.id)}>
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && filteredPassengers.length > 0 && renderPagination()}
      </div>

      {/* Passenger Details Modal */}
      {showPassengerModal && selectedPassenger && (
        <div className="adminbus-modal-overlay" onClick={handleCloseModal}>
          <div className="adminbus-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adminbus-modal-header">
              <h2>Passenger Details</h2>
              <button className="btn-adminbus-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="adminbus-modal-body">
              <div className="adminbus-passenger-details">
                <div className="adminbus-passenger-info">
                  <h3>{selectedPassenger.name}</h3>
                  <p>ID: #{selectedPassenger.id}</p>
                  <p>Phone: {selectedPassenger.phone}</p>
                  <p>Email: {selectedPassenger.email}</p>
                  <p>Status: 
                    <span className={`adminbus-status-badge ${selectedPassenger.status}`}>
                      {selectedPassenger.status}
                    </span>
                  </p>
                  <p>Registered On: {selectedPassenger.registeredOn}</p>
                  <p>Last Active: {selectedPassenger.lastActive}</p>
                </div>
                
                <div className="adminbus-passenger-bookings">
                  <h3>Bookings History</h3>
                  {selectedPassenger.bookings.length === 0 ? (
                    <p>No bookings found for this passenger.</p>
                  ) : (
                    <table className="adminbus-bookings-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Route</th>
                          <th>Date & Time</th>
                          <th>Seat</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPassenger.bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.route}</td>
                            <td>{booking.date} at {booking.time}</td>
                            <td>{booking.seatNumber}</td>
                            <td>{booking.price} RWF</td>
                            <td>
                              <span className={`adminbus-status-badge ${booking.status}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              {booking.status !== 'cancelled' && new Date(booking.date) > new Date() && (
                                <button 
                                  className="btn-adminbus-cancel-booking"
                                  onClick={() => handleCancelBooking(selectedPassenger.id, booking.id)}
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            <div className="adminbus-modal-footer">
              <button 
                className="btn-adminbus-send-notification" 
                onClick={() => handleSendNotification(selectedPassenger.id)}
              >
                <FaSms /> Send Notification
              </button>
              <button className="btn-adminbus-export">
                <FaDownload /> Export Data
              </button>
              <button className="btn-adminbus-close-modal" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="adminbus-action-modal-overlay" onClick={handleCloseModal}>
          <div className="adminbus-action-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="adminbus-action-btn"
              onClick={() => {
                handleSendNotification(actionPassengerId);
              }}
            >
              <FaSms /> Send SMS
            </button>
            <button 
              className="adminbus-action-btn"
              onClick={() => {
                const passenger = passengers.find(p => p.id === actionPassengerId);
                handleSendNotification(actionPassengerId);
              }}
            >
              <FaEnvelope /> Send Email
            </button>
            <button 
              className="adminbus-action-btn delete"
              onClick={() => handleDeletePassenger(actionPassengerId)}
            >
              <FaTrash /> Delete Passenger
            </button>
            <button 
              className="adminbus-action-btn cancel"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="adminbus-modal-overlay" onClick={handleCloseModal}>
          <div className="adminbus-modal notification-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adminbus-modal-header">
              <h2>Send Notification</h2>
              <button className="btn-adminbus-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="adminbus-modal-body">
              <form onSubmit={handleNotificationSubmit}>
                <div className="adminbus-form-group">
                  <label>Notification Type</label>
                  <div className="adminbus-notification-type-selector">
                    <label className="adminbus-radio-container">
                      <input type="radio" name="notificationType" value="sms" defaultChecked />
                      <span className="adminbus-radio-checkmark"></span>
                      SMS
                    </label>
                    <label className="adminbus-radio-container">
                      <input type="radio" name="notificationType" value="email" />
                      <span className="adminbus-radio-checkmark"></span>
                      Email
                    </label>
                    <label className="adminbus-radio-container">
                      <input type="radio" name="notificationType" value="both" />
                      <span className="adminbus-radio-checkmark"></span>
                      Both
                    </label>
                  </div>
                </div>

                <div className="adminbus-form-group">
                  <label>Subject / Title</label>
                  <input type="text" className="adminbus-form-control" placeholder="Enter notification subject" />
                </div>

                <div className="adminbus-form-group">
                  <label>Message</label>
                  <textarea 
                    className="adminbus-form-control" 
                    rows="5" 
                    placeholder="Type your message here...">
                  </textarea>
                </div>

                <div className="adminbus-form-group">
                  <label>Template (optional)</label>
                  <select className="adminbus-form-control">
                    <option value="">Select a template</option>
                    <option value="booking_confirmation">Booking Confirmation</option>
                    <option value="schedule_change">Schedule Change</option>
                    <option value="trip_reminder">Trip Reminder</option>
                    <option value="special_offer">Special Offer</option>
                  </select>
                </div>
              
                <div className="adminbus-form-actions">
                  <button type="submit" className="btn-adminbus-send">
                    Send Notification
                  </button>
                  <button type="button" className="btn-adminbus-cancel" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePassengers;