import React, { useState, useEffect } from 'react';
import './AdminStyles/adminbuses.css';

const AdminBuses = () => {
  // State for managing buses
  const [buses, setBuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState(null);
  const [formData, setFormData] = useState({
    busId: '',
    busName: '',
    busNumber: '',
    seatingCapacity: '',
    busType: 'Standard',
    routeName: '',
    status: 'Active',
    lastMaintenance: '',
    nextMaintenance: '',
    driverName: '',
    driverContact: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [busToDelete, setBusToDelete] = useState(null);
  const [viewType, setViewType] = useState('table'); // 'table' or 'card'

  // Mock data for initial render
  useEffect(() => {
    // This would be replaced with an API call in a real application
    const mockBuses = [
      {
        id: 1,
        busId: 'SW-001',
        busName: 'Kigali Express',
        busNumber: 'RAD 423 P',
        seatingCapacity: 45,
        busType: 'Luxury',
        routeName: 'Kigali - Butare',
        status: 'Active',
        lastMaintenance: '2025-01-15',
        nextMaintenance: '2025-04-15',
        driverName: 'Jean Claude',
        driverContact: '+250 78 123 4567'
      },
      {
        id: 2,
        busId: 'SW-002',
        busName: 'Nyagatare Shuttle',
        busNumber: 'RAA 878 G',
        seatingCapacity: 32,
        busType: 'Standard',
        routeName: 'Kigali - Nyagatare',
        status: 'Maintenance',
        lastMaintenance: '2025-02-20',
        nextMaintenance: '2025-05-20',
        driverName: 'Eric Mugisha',
        driverContact: '+250 73 987 6543'
      },
      {
        id: 3,
        busId: 'SW-003',
        busName: 'Gisenyi Cruiser',
        busNumber: 'RAC 512 J',
        seatingCapacity: 50,
        busType: 'Luxury',
        routeName: 'Kigali - Gisenyi',
        status: 'Active',
        lastMaintenance: '2025-03-05',
        nextMaintenance: '2025-06-05',
        driverName: 'Peace Uwimana',
        driverContact: '+250 79 456 7890'
      },
      {
        id: 4,
        busId: 'SW-004',
        busName: 'Huye Connector',
        busNumber: 'RAB 345 E',
        seatingCapacity: 35,
        busType: 'Standard',
        routeName: 'Kigali - Huye',
        status: 'Inactive',
        lastMaintenance: '2025-01-10',
        nextMaintenance: '2025-04-10',
        driverName: 'Patrick Habimana',
        driverContact: '+250 72 234 5678'
      }
    ];
    setBuses(mockBuses);
  }, []);

  // Filter buses based on search and filter criteria
  const filteredBuses = buses.filter(bus => {
    const matchesSearch = 
      bus.busName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.routeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || bus.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Open modal for adding a new bus
  const handleAddBus = () => {
    setCurrentBus(null);
    setFormData({
      busId: `SW-00${buses.length + 1}`,
      busName: '',
      busNumber: '',
      seatingCapacity: '',
      busType: 'Standard',
      routeName: '',
      status: 'Active',
      lastMaintenance: '',
      nextMaintenance: '',
      driverName: '',
      driverContact: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing bus
  const handleEditBus = (bus) => {
    setCurrentBus(bus);
    setFormData({
      busId: bus.busId,
      busName: bus.busName,
      busNumber: bus.busNumber,
      seatingCapacity: bus.seatingCapacity,
      busType: bus.busType,
      routeName: bus.routeName,
      status: bus.status,
      lastMaintenance: bus.lastMaintenance,
      nextMaintenance: bus.nextMaintenance,
      driverName: bus.driverName,
      driverContact: bus.driverContact
    });
    setIsModalOpen(true);
  };

  // Open confirmation modal for deleting a bus
  const handleDeleteConfirmation = (bus) => {
    setBusToDelete(bus);
    setIsDeleteModalOpen(true);
  };

  // Delete a bus from the list
  const handleDeleteBus = () => {
    const updatedBuses = buses.filter(bus => bus.id !== busToDelete.id);
    setBuses(updatedBuses);
    setIsDeleteModalOpen(false);
    showNotification('Bus deleted successfully!');
  };

  // Submit form for adding or editing a bus
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentBus) {
      // Edit existing bus
      const updatedBuses = buses.map(bus => 
        bus.id === currentBus.id ? { ...bus, ...formData } : bus
      );
      setBuses(updatedBuses);
      showNotification('Bus updated successfully!');
    } else {
      // Add new bus
      const newBus = {
        id: buses.length + 1,
        ...formData
      };
      setBuses([...buses, newBus]);
      showNotification('New bus added successfully!');
    }
    
    setIsModalOpen(false);
  };

  // Simple notification system
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'adminbus-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Toggle view between table and cards
  const toggleView = () => {
    setViewType(viewType === 'table' ? 'card' : 'table');
  };

  return (
    <div className="adminbus-container">
      {/* Header Section */}
      <div className="adminbus-header">
        <h1>Manage Buses</h1>
        <p>Add, update, and manage your fleet of SwiftRide buses</p>
      </div>

      {/* Stats Cards */}
      <div className="adminbus-stats">
        <div className="adminbus-stat-card adminbus-active">
          <h3>{buses.filter(bus => bus.status === 'Active').length}</h3>
          <p>Active Buses</p>
        </div>
        <div className="adminbus-stat-card adminbus-maintenance">
          <h3>{buses.filter(bus => bus.status === 'Maintenance').length}</h3>
          <p>In Maintenance</p>
        </div>
        <div className="adminbus-stat-card adminbus-inactive">
          <h3>{buses.filter(bus => bus.status === 'Inactive').length}</h3>
          <p>Inactive Buses</p>
        </div>
        <div className="adminbus-stat-card adminbus-total">
          <h3>{buses.length}</h3>
          <p>Total Fleet</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="adminbus-action-bar">
        <div className="adminbus-search-filter">
          <input
            type="text"
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adminbus-search"
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="adminbus-filter"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        
        <div className="adminbus-actions">
          <button 
            className="adminbus-btn adminbus-btn-view" 
            onClick={toggleView}
          >
            {viewType === 'table' ? 'Card View' : 'Table View'}
          </button>
          <button 
            className="adminbus-btn adminbus-btn-add" 
            onClick={handleAddBus}
          >
            Add New Bus
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewType === 'table' && (
        <div className="adminbus-table-container">
          <table className="adminbus-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Bus Name</th>
                <th>Bus Number</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Route</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.length > 0 ? (
                filteredBuses.map(bus => (
                  <tr key={bus.id}>
                    <td>{bus.busId}</td>
                    <td>{bus.busName}</td>
                    <td>{bus.busNumber}</td>
                    <td>{bus.seatingCapacity}</td>
                    <td>{bus.busType}</td>
                    <td>{bus.routeName}</td>
                    <td>
                      <span className={`adminbus-status adminbus-status-${bus.status.toLowerCase()}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="adminbus-actions-cell">
                      <button 
                        className="adminbus-btn adminbus-btn-view-details"
                        onClick={() => handleEditBus(bus)}
                      >
                        View
                      </button>
                      <button 
                        className="adminbus-btn adminbus-btn-edit"
                        onClick={() => handleEditBus(bus)}
                      >
                        Edit
                      </button>
                      <button 
                        className="adminbus-btn adminbus-btn-delete"
                        onClick={() => handleDeleteConfirmation(bus)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="adminbus-no-data">No buses found matching your search criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewType === 'card' && (
        <div className="adminbus-cards-container">
          {filteredBuses.length > 0 ? (
            filteredBuses.map(bus => (
              <div key={bus.id} className="adminbus-card">
                <div className="adminbus-card-header">
                  <h3>{bus.busName}</h3>
                  <span className={`adminbus-status adminbus-status-${bus.status.toLowerCase()}`}>
                    {bus.status}
                  </span>
                </div>
                <div className="adminbus-card-body">
                  <p><strong>Bus ID:</strong> {bus.busId}</p>
                  <p><strong>Bus Number:</strong> {bus.busNumber}</p>
                  <p><strong>Capacity:</strong> {bus.seatingCapacity} seats</p>
                  <p><strong>Type:</strong> {bus.busType}</p>
                  <p><strong>Route:</strong> {bus.routeName}</p>
                  <p><strong>Driver:</strong> {bus.driverName}</p>
                </div>
                <div className="adminbus-card-footer">
                  <button 
                    className="adminbus-btn adminbus-btn-view-details"
                    onClick={() => handleEditBus(bus)}
                  >
                    View Details
                  </button>
                  <button 
                    className="adminbus-btn adminbus-btn-edit"
                    onClick={() => handleEditBus(bus)}
                  >
                    Edit
                  </button>
                  <button 
                    className="adminbus-btn adminbus-btn-delete"
                    onClick={() => handleDeleteConfirmation(bus)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="adminbus-no-data-card">No buses found matching your search criteria.</div>
          )}
        </div>
      )}

      {/* Add/Edit Bus Modal */}
      {isModalOpen && (
        <div className="adminbus-modal-overlay">
          <div className="adminbus-modal">
            <div className="adminbus-modal-header">
              <h2>{currentBus ? 'Edit Bus' : 'Add New Bus'}</h2>
              <button 
                className="adminbus-btn adminbus-btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="adminbus-form">
              <div className="adminbus-form-grid">
                <div className="adminbus-form-group">
                  <label htmlFor="busId">Bus ID</label>
                  <input
                    type="text"
                    id="busId"
                    name="busId"
                    value={formData.busId}
                    onChange={handleInputChange}
                    required
                    disabled={currentBus !== null}
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="busName">Bus Name</label>
                  <input
                    type="text"
                    id="busName"
                    name="busName"
                    value={formData.busName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Kigali Express"
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="busNumber">Bus Number</label>
                  <input
                    type="text"
                    id="busNumber"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. RAD 423 P"
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="seatingCapacity">Seating Capacity</label>
                  <input
                    type="number"
                    id="seatingCapacity"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="e.g. 45"
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="busType">Bus Type</label>
                  <select
                    id="busType"
                    name="busType"
                    value={formData.busType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Standard">Standard</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Mini">Mini</option>
                    <option value="Double-Decker">Double-Decker</option>
                  </select>
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="routeName">Route Name</label>
                  <input
                    type="text"
                    id="routeName"
                    name="routeName"
                    value={formData.routeName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Kigali - Butare"
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="lastMaintenance">Last Maintenance Date</label>
                  <input
                    type="date"
                    id="lastMaintenance"
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="nextMaintenance">Next Maintenance Date</label>
                  <input
                    type="date"
                    id="nextMaintenance"
                    name="nextMaintenance"
                    value={formData.nextMaintenance}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="driverName">Driver Name</label>
                  <input
                    type="text"
                    id="driverName"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Jean Claude"
                  />
                </div>
                <div className="adminbus-form-group">
                  <label htmlFor="driverContact">Driver Contact</label>
                  <input
                    type="text"
                    id="driverContact"
                    name="driverContact"
                    value={formData.driverContact}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. +250 78 123 4567"
                  />
                </div>
              </div>
              <div className="adminbus-form-actions">
                <button 
                  type="button" 
                  className="adminbus-btn adminbus-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="adminbus-btn adminbus-btn-submit"
                >
                  {currentBus ? 'Update Bus' : 'Add Bus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="adminbus-modal-overlay">
          <div className="adminbus-modal adminbus-delete-modal">
            <div className="adminbus-modal-header">
              <h2>Confirm Deletion</h2>
              <button 
                className="adminbus-btn adminbus-btn-close"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="adminbus-modal-body">
              <p>Are you sure you want to delete the bus "{busToDelete.busName}"?</p>
              <p className="adminbus-warning">This action cannot be undone.</p>
            </div>
            <div className="adminbus-modal-footer">
              <button 
                className="adminbus-btn adminbus-btn-cancel"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="adminbus-btn adminbus-btn-confirm"
                onClick={handleDeleteBus}
              >
                Delete Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBuses;