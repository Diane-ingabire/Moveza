import React, { useState, useEffect } from "react";
import "../Dashboard/dashboardstyles/busTrack.css";
import { FaBus, FaMapMarkerAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

const BusTrack = () => {
  // Sample data - In a real app, this would come from your backend/API
  const [busData, setBusData] = useState({
    routeId: "RW123",
    busId: "KGL-234",
    currentLocation: "Remera",
    nextStop: "Kimironko",
    estimatedArrival: "10 minutes",
    status: "on-time", // can be 'on-time', 'delayed', 'cancelled'
    capacity: 85, // percentage
    stops: [
      { name: "Nyabugogo", status: "completed", time: "08:00" },
      { name: "Remera", status: "current", time: "08:30" },
      { name: "Kimironko", status: "upcoming", time: "08:40" },
      { name: "Kabuga", status: "upcoming", time: "09:10" },
      { name: "Nyanza", status: "upcoming", time: "09:30" }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This simulates receiving real-time updates
      // In a real app, you would use WebSockets or polling to get updates
      const randomDelay = Math.floor(Math.random() * 10);
      const newEstimatedArrival = `${10 - randomDelay} minutes`;
      
      setBusData(prev => ({
        ...prev,
        estimatedArrival: newEstimatedArrival,
        status: randomDelay > 8 ? "delayed" : "on-time",
        capacity: Math.min(100, prev.capacity + Math.floor(Math.random() * 5) - 2)
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "on-time": return "green";
      case "delayed": return "orange";
      case "cancelled": return "red";
      default: return "green";
    }
  };

  // Format time remaining
  const formatTimeRemaining = (estimatedTime) => {
    if (estimatedTime.includes("minute")) {
      const minutes = parseInt(estimatedTime);
      if (minutes <= 2) return "Arriving shortly";
      return estimatedTime;
    }
    return estimatedTime;
  };

  return (
    <div className="bus-tracker-container">
      <div className="bus-tracker-header">
        <h2>Real-time Bus Tracker</h2>
        <div className="bus-info">
          <div className="bus-route">
            <span className="label">Route:</span>
            <span className="value">{busData.routeId}</span>
          </div>
          <div className="bus-id">
            <span className="label">Bus:</span>
            <span className="value">{busData.busId}</span>
          </div>
        </div>
      </div>

      <div className="tracker-main">
        <div className="current-status">
          <div className="status-card">
            <div className="status-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="status-details">
              <h3>Current Location</h3>
              <p>{busData.currentLocation}</p>
            </div>
          </div>

          <div className="status-card">
            <div className="status-icon">
              <FaBus />
            </div>
            <div className="status-details">
              <h3>Next Stop</h3>
              <p>{busData.nextStop}</p>
            </div>
          </div>

          <div className="status-card">
            <div className="status-icon">
              <FaClock />
            </div>
            <div className="status-details">
              <h3>Estimated Arrival</h3>
              <p>{formatTimeRemaining(busData.estimatedArrival)}</p>
            </div>
          </div>

          <div className="status-card">
            <div className="status-icon" style={{ color: getStatusColor(busData.status) }}>
              {busData.status === "delayed" ? (
                <FaExclamationTriangle />
              ) : (
                <FaBus />
              )}
            </div>
            <div className="status-details">
              <h3>Status</h3>
              <p style={{ color: getStatusColor(busData.status) }}>
                {busData.status.charAt(0).toUpperCase() + busData.status.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="capacity-indicator">
          <h3>Bus Capacity</h3>
          <div className="capacity-bar">
            <div 
              className="capacity-fill" 
              style={{ 
                width: `${busData.capacity}%`,
                backgroundColor: busData.capacity > 90 ? '#f44336' : (busData.capacity > 70 ? '#ff9800' : '#4caf50')
              }}
            ></div>
          </div>
          <p>{busData.capacity}% Full</p>
        </div>

        <div className="route-timeline">
          <h3>Route Timeline</h3>
          <div className="timeline">
            {busData.stops.map((stop, index) => (
              <div key={index} className={`timeline-item ${stop.status}`}>
                <div className="timeline-marker">
                  {stop.status === "current" ? <FaBus /> : <span></span>}
                </div>
                <div className="timeline-content">
                  <h4>{stop.name}</h4>
                  <p className="time">{stop.time}</p>
                  <p className="status">
                    {stop.status === "completed" && "Passed"}
                    {stop.status === "current" && "Current Location"}
                    {stop.status === "upcoming" && "Upcoming"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tracker-actions">
        <button className="action-btn refresh">Refresh</button>
        <button className="action-btn share">Share Location</button>
        <button className="action-btn report">Report Issue</button>
      </div>
    </div>
  );
};

export default BusTrack;