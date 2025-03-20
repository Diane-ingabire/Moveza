import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, Filter, AlertCircle, Bus, Clock, Map, Navigation } from 'lucide-react';
import '../DashboardAdmin/AdminStyles/admintracking.css';
import L from 'leaflet';

// Fix for Leaflet marker icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different bus statuses
const busIcons = {
  onTime: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    className: 'bus-icon on-time'
  }),
  delayed: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    className: 'bus-icon delayed'
  }),
  arrived: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    className: 'bus-icon arrived'
  })
};

const AdminTracking = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const mockBuses = [
    {
      id: 'KGL2022065',
      route: 'Kigali to Musanze',
      driver: 'Ronald Richards',
      phone: '+250781234567',
      email: 'ronald@swiftride.com',
      status: 'on the way',
      speed: 65,
      lastUpdated: new Date(),
      coordinates: [-1.9441, 30.0619], // Near Kigali
      estimatedArrival: new Date(Date.now() + 40 * 60000), // 40 minutes from now
      passengers: 28,
      capacity: 42,
      nextStop: 'Rulindo',
      distanceRemaining: '45 km'
    },
    {
      id: 'KGL2022066',
      route: 'Kigali to Huye',
      driver: 'Jane Clareberry',
      phone: '+250787654321',
      email: 'jane@swiftride.com',
      status: 'delayed',
      speed: 45,
      lastUpdated: new Date(),
      coordinates: [-1.9605, 30.0448], // Another location in Kigali
      estimatedArrival: new Date(Date.now() + 90 * 60000), // 90 minutes from now
      passengers: 32,
      capacity: 42,
      nextStop: 'Nyamata',
      distanceRemaining: '88 km'
    },
    {
      id: 'KGL5239438',
      route: 'Kigali to Gisenyi',
      driver: 'Samuel Dion',
      phone: '+250789876543',
      email: 'samuel@swiftride.com',
      status: 'completed',
      speed: 0,
      lastUpdated: new Date(),
      coordinates: [-1.6734, 29.2395], // Near Gisenyi
      estimatedArrival: null,
      passengers: 40,
      capacity: 42,
      nextStop: 'Terminal',
      distanceRemaining: '0 km'
    },
    {
      id: 'KGL0818599',
      route: 'Kigali to Nyagatare',
      driver: 'Maria Johnson',
      phone: '+250782345678',
      email: 'maria@swiftride.com',
      status: 'on the way',
      speed: 72,
      lastUpdated: new Date(),
      coordinates: [-1.8445, 30.2618], // On the way to Nyagatare
      estimatedArrival: new Date(Date.now() + 65 * 60000), // 65 minutes from now
      passengers: 35,
      capacity: 42,
      nextStop: 'Kayonza',
      distanceRemaining: '64 km'
    },
    {
      id: 'KGL1021380',
      route: 'Kigali to Cyangugu',
      driver: 'Peter Williams',
      phone: '+250783456789',
      email: 'peter@swiftride.com',
      status: 'on the way',
      speed: 58,
      lastUpdated: new Date(),
      coordinates: [-2.1521, 29.7620], // Heading to Cyangugu
      estimatedArrival: new Date(Date.now() + 120 * 60000), // 120 minutes from now
      passengers: 38,
      capacity: 42,
      nextStop: 'Nyanza',
      distanceRemaining: '112 km'
    }
  ];

  // Fetch bus data
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch('https://api.swiftride.com/buses/live');
        // const data = await response.json();
        setLoading(false);
        setBuses(mockBuses);
        setFilteredBuses(mockBuses);
      } catch (err) {
        setError('Failed to fetch bus data. Please try again later.');
        setLoading(false);
      }
    };

    fetchBuses();

    // Setup WebSocket or polling for real-time updates
    const interval = setInterval(() => {
      // Simulate movement by slightly changing coordinates
      const updatedBuses = mockBuses.map(bus => {
        if (bus.status === 'on the way') {
          return {
            ...bus,
            coordinates: [
              bus.coordinates[0] + (Math.random() * 0.002 - 0.001),
              bus.coordinates[1] + (Math.random() * 0.002 - 0.001)
            ],
            lastUpdated: new Date()
          };
        }
        return bus;
      });
      setBuses(updatedBuses);
      
      // Apply current filters to the updated buses
      filterBuses(updatedBuses, searchQuery, filter);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter buses based on search query and filter selection
  const filterBuses = (busData = buses, query = searchQuery, filterType = filter) => {
    let filtered = busData;
    
    if (query) {
      filtered = filtered.filter(bus => 
        bus.id.toLowerCase().includes(query.toLowerCase()) ||
        bus.route.toLowerCase().includes(query.toLowerCase()) ||
        bus.driver.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(bus => {
        if (filterType === 'onRoute') return bus.status === 'on the way';
        if (filterType === 'delayed') return bus.status === 'delayed';
        if (filterType === 'arrived') return bus.status === 'completed';
        return true;
      });
    }
    
    setFilteredBuses(filtered);
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBuses(buses, query, filter);
  };

  // Handler for filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    filterBuses(buses, searchQuery, filterType);
    setShowFilters(false);
  };

  // Format estimated arrival time
  const formatArrivalTime = (date) => {
    if (!date) return 'Arrived';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    if (status === 'on the way') return 'on-time';
    if (status === 'delayed') return 'delayed';
    if (status === 'completed') return 'arrived';
    return '';
  };

  // Get icon based on bus status
  const getBusIcon = (status) => {
    if (status === 'on the way') return busIcons.onTime;
    if (status === 'delayed') return busIcons.delayed;
    if (status === 'completed') return busIcons.arrived;
    return busIcons.onTime;
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <div className="tracking-title">
          <h1>Real-time Bus Tracking</h1>
          <p>View and monitor your fleet in real-time across Rwanda</p>
        </div>
        <div className="tracking-search">
          <div className="search-input">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search by bus ID, route, or driver" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-container">
            <button 
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} /> Filters
            </button>
            {showFilters && (
              <div className="filter-dropdown">
                <button 
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => handleFilterChange('all')}
                >
                  All Buses
                </button>
                <button 
                  className={filter === 'onRoute' ? 'active' : ''}
                  onClick={() => handleFilterChange('onRoute')}
                >
                  On Route
                </button>
                <button 
                  className={filter === 'delayed' ? 'active' : ''}
                  onClick={() => handleFilterChange('delayed')}
                >
                  Delayed
                </button>
                <button 
                  className={filter === 'arrived' ? 'active' : ''}
                  onClick={() => handleFilterChange('arrived')}
                >
                  Arrived
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tracking-content">
        <div className="bus-list">
          <h2>Active Buses ({filteredBuses.length})</h2>
          {loading ? (
            <div className="loading-state">Loading bus data...</div>
          ) : error ? (
            <div className="error-state">
              <AlertCircle size={24} />
              <p>{error}</p>
            </div>
          ) : filteredBuses.length === 0 ? (
            <div className="no-results">No buses match your search criteria</div>
          ) : (
            <div className="bus-cards">
              {filteredBuses.map(bus => (
                <div 
                  key={bus.id} 
                  className={`bus-card ${getStatusClass(bus.status)}`}
                  onClick={() => setSelectedBus(bus)}
                >
                  <div className="bus-card-header">
                    <div className="bus-id">
                      <Bus size={18} />
                      <span>{bus.id}</span>
                    </div>
                    <div className={`bus-status ${getStatusClass(bus.status)}`}>
                      {bus.status}
                    </div>
                  </div>
                  <div className="bus-route">
                    <Map size={16} />
                    <span>{bus.route}</span>
                  </div>
                  <div className="bus-driver">
                    <span>{bus.driver}</span>
                  </div>
                  <div className="bus-info-row">
                    <div className="bus-speed">
                      <Navigation size={16} />
                      <span>{bus.speed} km/h</span>
                    </div>
                    <div className="bus-arrival">
                      <Clock size={16} />
                      <span>{formatArrivalTime(bus.estimatedArrival)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="map-container">
          {loading ? (
            <div className="loading-state">Loading map...</div>
          ) : error ? (
            <div className="error-state">
              <AlertCircle size={24} />
              <p>Failed to load map. Please try again later.</p>
            </div>
          ) : (
            <MapContainer 
              center={[-1.9441, 30.0619]} // Center on Kigali
              zoom={9} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredBuses.map(bus => (
                <Marker 
                  key={bus.id}
                  position={bus.coordinates}
                  icon={getBusIcon(bus.status)}
                >
                  <Popup>
                    <div className="bus-popup">
                      <h3>{bus.id}</h3>
                      <p><strong>Route:</strong> {bus.route}</p>
                      <p><strong>Driver:</strong> {bus.driver}</p>
                      <p><strong>Status:</strong> <span className={getStatusClass(bus.status)}>{bus.status}</span></p>
                      <p><strong>Speed:</strong> {bus.speed} km/h</p>
                      <p><strong>Next Stop:</strong> {bus.nextStop}</p>
                      <p><strong>Passengers:</strong> {bus.passengers}/{bus.capacity}</p>
                      <p><strong>Distance Remaining:</strong> {bus.distanceRemaining}</p>
                      <p><strong>Est. Arrival:</strong> {formatArrivalTime(bus.estimatedArrival)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      {selectedBus && (
        <div className="bus-details-panel">
          <div className="bus-details-header">
            <h2>Bus Details</h2>
            <button className="close-button" onClick={() => setSelectedBus(null)}>×</button>
          </div>
          <div className="bus-details-content">
            <div className="bus-details-section">
              <h3>Bus Information</h3>
              <div className="detail-row">
                <span className="detail-label">Bus ID:</span>
                <span className="detail-value">{selectedBus.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Route:</span>
                <span className="detail-value">{selectedBus.route}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status ${getStatusClass(selectedBus.status)}`}>
                  {selectedBus.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Passengers:</span>
                <span className="detail-value">{selectedBus.passengers}/{selectedBus.capacity}</span>
              </div>
            </div>
            
            <div className="bus-details-section">
              <h3>Journey Information</h3>
              <div className="detail-row">
                <span className="detail-label">Current Speed:</span>
                <span className="detail-value">{selectedBus.speed} km/h</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Stop:</span>
                <span className="detail-value">{selectedBus.nextStop}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Distance Remaining:</span>
                <span className="detail-value">{selectedBus.distanceRemaining}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Estimated Arrival:</span>
                <span className="detail-value">{formatArrivalTime(selectedBus.estimatedArrival)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{selectedBus.lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="bus-details-section">
              <h3>Driver Information</h3>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedBus.driver}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedBus.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedBus.email}</span>
              </div>
            </div>
            
            <div className="bus-actions">
              <button className="action-button contact">Contact Driver</button>
              <button className="action-button alert">Send Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTracking;