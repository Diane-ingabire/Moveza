import React, { useState, useEffect } from 'react';
import '../DashboardAdmin/AdminStyles/admintracking.css';

// Mock data for demonstration purposes
const MOCK_BUSES = [
  { 
    id: 'BUS001', 
    route: 'Kigali - Musanze', 
    driver: 'Emmanuel Habimana',
    phone: '+250781234567',
    departureTime: '08:30 AM',
    arrivalTime: '10:45 AM',
    status: 'On Route',
    passengers: 32,
    capacity: 45,
    currentLocation: { lat: -1.9441, lng: 30.0619 },
    nextStop: 'Nyabugogo Terminal',
    nextStopTime: '09:15 AM',
    lastUpdated: '08:47 AM',
    speed: 65,
    fuelLevel: 78
  },
  { 
    id: 'BUS002', 
    route: 'Kigali - Huye', 
    driver: 'Alice Uwimana',
    phone: '+250789876543',
    departureTime: '09:00 AM',
    arrivalTime: '11:30 AM',
    status: 'Delayed',
    passengers: 41,
    capacity: 50,
    currentLocation: { lat: -1.9706, lng: 30.0448 },
    nextStop: 'Nyanza Junction',
    nextStopTime: '10:05 AM',
    lastUpdated: '09:32 AM',
    speed: 48,
    fuelLevel: 45
  },
  { 
    id: 'BUS003', 
    route: 'Kigali - Gisenyi', 
    driver: 'Jean Pierre Mugabo',
    phone: '+250728765432',
    departureTime: '07:45 AM',
    arrivalTime: '11:15 AM',
    status: 'On Time',
    passengers: 38,
    capacity: 45,
    currentLocation: { lat: -1.9537, lng: 30.1269 },
    nextStop: 'Musanze Station',
    nextStopTime: '09:55 AM',
    lastUpdated: '09:28 AM',
    speed: 72,
    fuelLevel: 62
  },
  { 
    id: 'BUS004', 
    route: 'Kigali - Nyagatare', 
    driver: 'Patrick Ndayishimiye',
    phone: '+250732109876',
    departureTime: '08:15 AM',
    arrivalTime: '10:30 AM',
    status: 'Stopped',
    passengers: 27,
    capacity: 40,
    currentLocation: { lat: -1.8903, lng: 30.0988 },
    nextStop: 'Kayonza Terminal',
    nextStopTime: '09:45 AM',
    lastUpdated: '09:17 AM',
    speed: 0,
    fuelLevel: 39
  }
];

const AdminTracking = () => {
  const [buses, setBuses] = useState(MOCK_BUSES);
  const [selectedBus, setSelectedBus] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRoute, setFilterRoute] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapView, setMapView] = useState('all'); // 'all' or 'single'
  const handleContactDriver = (bus) => {
    // In a real application, this might open a calling interface or dialer
    window.open(`tel:${bus.phone}`, '_blank');
    // Alternatively, show a confirmation
    alert(`Initiating call to ${bus.driver} at ${bus.phone}`);
  };
  
  const handleSendMessage = (bus) => {
    // Create a modal or popup for sending a message
    const message = prompt(`Type your message to send to ${bus.driver}:`, "Please provide an update on your status.");
    if (message && message.trim() !== "") {
      // In a real app, this would send the message to an API
      alert(`Message sent to ${bus.driver}: "${message}"`);
      // You could also update a messages state to track sent messages
    }
  };
  
  const handleViewJourney = (bus) => {
    // This could open a modal with a detailed journey map
    alert(`Viewing detailed journey for bus ${bus.id} (${bus.route})\n\nIn a complete implementation, this would show a detailed map with all stops and timing information.`);
    // In a real application, you might set some state to show a journey modal
    // setShowJourneyModal(true);
    // setSelectedJourney(bus.id);
  };
  
  const handleTripHistory = (bus) => {
    // This could fetch and display historical trip data
    alert(`Loading trip history for bus ${bus.id}\n\nIn a complete implementation, this would show past trips, performance metrics, and analytics.`);
    // In a real application, you might navigate to a history page
    // history.push(`/admin/buses/${bus.id}/history`);
  };

  useEffect(() => {
    // In a real application, this would be a websocket or polling connection
    // to get real-time updates from the server
    const interval = setInterval(() => {
      // Simulate bus movement by updating locations slightly
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          if (bus.status === 'Stopped') return bus;
          
          
          return {
            ...bus,
            currentLocation: {
              lat: bus.currentLocation.lat + (Math.random() * 0.001 - 0.0005),
              lng: bus.currentLocation.lng + (Math.random() * 0.001 - 0.0005)
            },
            lastUpdated: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setMapView('single');
  };

  const handleBackToAllBuses = () => {
    setSelectedBus(null);
    setMapView('all');
  };

  const filteredBuses = buses.filter(bus => {
    const matchesStatus = filterStatus === 'All' || bus.status === filterStatus;
    const matchesRoute = filterRoute === 'All' || bus.route === filterRoute;
    const matchesSearch = bus.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesRoute && matchesSearch;
  });

  const uniqueStatuses = ['All', ...new Set(buses.map(bus => bus.status))];
  const uniqueRoutes = ['All', ...new Set(buses.map(bus => bus.route))];

  const getStatusClass = (status) => {
    switch(status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'On Route': return 'status-on-route';
      case 'Stopped': return 'status-stopped';
      default: return '';
    }
  };

  const getBusIcon = (status) => {
    switch(status) {
      case 'On Time': return '🚌';
      case 'Delayed': return '🚌';
      case 'On Route': return '🚌';
      case 'Stopped': return '🚏';
      default: return '🚌';
    }
  };

  return (
    <div className="bus-tracking-container">
      <h1>Bus Tracking System</h1>
      <div className="tracking-controls">
        <div className="search-filters">
          <input 
            type="text" 
            placeholder="Search bus ID, driver, or route..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select 
            value={filterRoute} 
            onChange={(e) => setFilterRoute(e.target.value)}
            className="filter-select"
          >
            {uniqueRoutes.map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
          
          <button 
            className="view-toggle-btn"
            onClick={() => setMapView(mapView === 'all' ? 'list' : 'all')}
          >
            {mapView === 'all' ? 'List View' : 'Map View'}
          </button>
        </div>
        
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-value">{buses.length}</span>
            <span className="stat-label">Total Buses</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{buses.filter(b => b.status === 'On Time').length}</span>
            <span className="stat-label">On Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{buses.filter(b => b.status === 'Delayed').length}</span>
            <span className="stat-label">Delayed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{buses.filter(b => b.status === 'Stopped').length}</span>
            <span className="stat-label">Stopped</span>
          </div>
        </div>
      </div>

      <div className="tracking-content">
        {mapView !== 'list' && (
          <div className="map-container">
            {/* This would be replaced with an actual map integration like Google Maps or Mapbox */}
            <div className="mock-map">
              <div className="map-header">
                <h3>{selectedBus ? `Tracking Bus ${selectedBus.id}` : 'All Active Buses'}</h3>
                {selectedBus && (
                  <button onClick={handleBackToAllBuses} className="back-button">
                    Back to All Buses
                  </button>
                )}
              </div>

              {/* Simple map representation - would be replaced with actual map */}
              <div className="map-area">
                {selectedBus ? (
                  <div 
                    className={`bus-marker ${getStatusClass(selectedBus.status)}`}
                    style={{
                      left: `${(selectedBus.currentLocation.lng - 30.04) * 1000 + 50}px`,
                      top: `${-(selectedBus.currentLocation.lat + 1.95) * 1000 + 200}px`
                    }}
                  >
                    {getBusIcon(selectedBus.status)}
                    <div className="bus-tooltip">
                      <strong>{selectedBus.id}</strong><br/>
                      {selectedBus.route}<br/>
                      {selectedBus.status}
                    </div>
                  </div>
                ) : (
                  filteredBuses.map(bus => (
                    <div 
                      key={bus.id}
                      className={`bus-marker ${getStatusClass(bus.status)}`}
                      onClick={() => handleBusSelect(bus)}
                      style={{
                        left: `${(bus.currentLocation.lng - 30.04) * 1000 + 50}px`,
                        top: `${-(bus.currentLocation.lat + 1.95) * 1000 + 200}px`
                      }}
                    >
                      {getBusIcon(bus.status)}
                      <div className="bus-tooltip">
                        <strong>{bus.id}</strong><br/>
                        {bus.route}<br/>
                        {bus.status}
                      </div>
                    </div>
                  ))
                )}
                <div className="map-overlay">Rwanda Map View</div>
              </div>
            </div>
          </div>
        )}

        <div className="buses-list">
          <h3>Active Buses ({filteredBuses.length})</h3>
          
          {filteredBuses.length === 0 ? (
            <div className="no-buses-message">
              No buses match your search criteria
            </div>
          ) : (
            filteredBuses.map(bus => (
              <div 
                key={bus.id} 
                className={`bus-card ${selectedBus?.id === bus.id ? 'selected' : ''}`}
                onClick={() => handleBusSelect(bus)}
              >
                <div className="bus-card-header">
                  <div className="bus-id">{bus.id}</div>
                  <div className={`bus-status ${getStatusClass(bus.status)}`}>
                    {bus.status}
                  </div>
                </div>
                
                <div className="bus-details">
                  <div className="detail-row">
                    <span className="detail-label">Route:</span>
                    <span className="detail-value">{bus.route}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Driver:</span>
                    <span className="detail-value">{bus.driver}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Next Stop:</span>
                    <span className="detail-value">{bus.nextStop} ({bus.nextStopTime})</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Passengers:</span>
                    <span className="detail-value">{bus.passengers}/{bus.capacity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">{bus.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="bus-actions">
                  <button className="action-btn contact-btn">Contact Driver</button>
                  <button className="action-btn track-btn">Track</button>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedBus && (
          <div className="bus-details-panel">
            <h3>Bus Details - {selectedBus.id}</h3>
            
            <div className="detail-section">
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status ${getStatusClass(selectedBus.status)}`}>
                  {selectedBus.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Route:</span>
                <span className="detail-value">{selectedBus.route}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Driver:</span>
                <span className="detail-value">{selectedBus.driver}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedBus.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Departure:</span>
                <span className="detail-value">{selectedBus.departureTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Arrival (Est.):</span>
                <span className="detail-value">{selectedBus.arrivalTime}</span>
              </div>
            </div>
            
            <div className="detail-section">
              <h4>Current Status</h4>
              <div className="detail-row">
                <span className="detail-label">Speed:</span>
                <span className="detail-value">{selectedBus.speed} km/h</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Fuel Level:</span>
                <span className="detail-value">
                  <div className="fuel-gauge">
                    <div 
                      className="fuel-level" 
                      style={{width: `${selectedBus.fuelLevel}%`, 
                      background: selectedBus.fuelLevel < 20 ? 'red' : 
                                 selectedBus.fuelLevel < 40 ? 'orange' : 'green'
                      }}
                    ></div>
                  </div>
                  <span>{selectedBus.fuelLevel}%</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Stop:</span>
                <span className="detail-value">{selectedBus.nextStop}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ETA at Stop:</span>
                <span className="detail-value">{selectedBus.nextStopTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Passengers:</span>
                <span className="detail-value">
                  <div className="capacity-indicator">
                    <div 
                      className="capacity-level" 
                      style={{width: `${(selectedBus.passengers / selectedBus.capacity) * 100}%`}}
                    ></div>
                  </div>
                  <span>{selectedBus.passengers}/{selectedBus.capacity}</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{selectedBus.lastUpdated}</span>
              </div>
            </div>
            
            <div className="bus-action-buttons">
    <button 
      className="action-btn" 
      onClick={() => handleContactDriver(selectedBus)}
    >
      Contact Driver
    </button>
    <button 
      className="action-btn" 
      onClick={() => handleSendMessage(selectedBus)}
    >
      Send Message
    </button>
    <button 
      className="action-btn" 
      onClick={() => handleViewJourney(selectedBus)}
    >
      View Journey
    </button>
    <button 
      className="action-btn" 
      onClick={() => handleTripHistory(selectedBus)}
    >
      Trip History
    </button>
  </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTracking;