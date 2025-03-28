import React, { useState, useEffect } from 'react';
import './AdminStyles/adminbooking.css';

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Mock data for demonstration - replace with your actual API call
    const fetchBookings = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockBookings = [
            { id: 1, customerName: "Racheal MUTESI", serviceType: "Bus001", date: "2025-03-25", time: "10:00 AM", status: "confirmed", phone: "123-456-7890", email: "john@example.com" },
            { id: 2, customerName: "Jane MUTONI", serviceType: "Bus002", date: "2025-03-26", time: "2:30 PM", status: "pending", phone: "234-567-8901", email: "jane@example.com" },
            { id: 3, customerName: "Mike RUGIRA", serviceType: "Bus003", date: "2025-03-27", time: "11:15 AM", status: "cancelled", phone: "345-678-9012", email: "mike@example.com" },
            { id: 4, customerName: "Bosco NSHUTI", serviceType: "Bus004", date: "2025-03-28", time: "3:45 PM", status: "confirmed", phone: "456-789-0123", email: "sarah@example.com" },
            { id: 5, customerName: "David MUTABAZI", serviceType: "Bus005", date: "2025-03-29", time: "9:30 AM", status: "pending", phone: "567-890-1234", email: "david@example.com" },
          ];
          setBookings(mockBookings);
          setFilteredBookings(mockBookings);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    // Filter bookings based on search term and status
    const results = bookings.filter(booking => {
      const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredBookings(results);
  }, [searchTerm, statusFilter, bookings]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    // Update booking status
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      if (selectedBooking && selectedBooking.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-booking-container">
      <h1>Booking Management</h1>
      
      <div className="booking-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, service, or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="status-filter"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>BusNumber</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className={`booking-row status-${booking.status}`}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.serviceType}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="booking-actions">
                    <button 
                      className="action-button view" 
                      onClick={() => handleViewDetails(booking)}
                    >
                      View
                    </button>
                    <select
                      className="status-select"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="confirmed">Confirm</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                    <button 
                      className="action-button delete" 
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-bookings-message">
          <p>No bookings found. Try adjusting your search or filter.</p>
        </div>
      )}
      
      {isModalOpen && selectedBooking && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <h2>Booking Details</h2>
            <div className="booking-details">
              <div className="detail-row">
                <span className="detail-label">Booking ID:</span>
                <span className="detail-value">{selectedBooking.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Customer Name:</span>
                <span className="detail-value">{selectedBooking.customerName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedBooking.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedBooking.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Service:</span>
                <span className="detail-value">{selectedBooking.serviceType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(selectedBooking.date)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedBooking.time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-badge ${selectedBooking.status}`}>
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="modal-actions">
              <select
                className="status-select"
                value={selectedBooking.status}
                onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
              >
                <option value="confirmed">Confirm</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancel</option>
              </select>
              <button 
                className="action-button delete" 
                onClick={() => handleDeleteBooking(selectedBooking.id)}
              >
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooking;