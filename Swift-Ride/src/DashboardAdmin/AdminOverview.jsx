import React, { useState } from 'react';
import '../DashboardAdmin/AdminStyles/adminoverview.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const AdminOverview = () => {
  // Date picker state
  const [dateRange, setDateRange] = useState('weekly');

  // Sample data for dashboard
  const summaryData = [
    { id: 1, title: 'Total Bookings', value: '1,258', change: '+12.5%', icon: '🎫', trend: 'up', color: '#4299e1' },
    { id: 2, title: 'Active Buses', value: '42', change: '+3 buses', icon: '🚌', trend: 'up', color: '#48bb78' },
    { id: 3, title: 'Revenue', value: 'RWF 5.3M', change: '+8.2%', icon: '💰', trend: 'up', color: '#f6ad55' },
    { id: 4, title: 'Customer Rating', value: '4.7/5', change: '+0.3', icon: '⭐', trend: 'up', color: '#f56565' },
  ];

  const bookingData = [
    { name: 'Mon', bookings: 150, revenue: 450000 },
    { name: 'Tue', bookings: 230, revenue: 690000 },
    { name: 'Wed', bookings: 310, revenue: 930000 },
    { name: 'Thu', bookings: 280, revenue: 840000 },
    { name: 'Fri', bookings: 380, revenue: 1140000 },
    { name: 'Sat', bookings: 590, revenue: 1770000 },
    { name: 'Sun', bookings: 420, revenue: 1260000 },
  ];

  const routeData = [
    { name: 'Kigali-Musanze', value: 35 },
    { name: 'Kigali-Huye', value: 25 },
    { name: 'Kigali-Gisenyi', value: 20 },
    { name: 'Kigali-Nyagatare', value: 15 },
    { name: 'Other Routes', value: 5 },
  ];

  const busData = [
    { id: 'BUS001', route: 'Kigali-Musanze', status: 'On Route', occupancy: '85%', nextStop: 'Musanze Terminal', arrivalTime: '14:30' },
    { id: 'BUS012', route: 'Kigali-Huye', status: 'Delayed', occupancy: '90%', nextStop: 'Nyanza', arrivalTime: '15:45' },
    { id: 'BUS023', route: 'Kigali-Gisenyi', status: 'On Time', occupancy: '75%', nextStop: 'Rubavu Terminal', arrivalTime: '16:20' },
    { id: 'BUS034', route: 'Kigali-Nyagatare', status: 'On Time', occupancy: '60%', nextStop: 'Nyagatare Terminal', arrivalTime: '17:10' },
    { id: 'BUS045', route: 'Kigali-Rusizi', status: 'On Route', occupancy: '80%', nextStop: 'Rusizi Terminal', arrivalTime: '18:30' },
  ];

  const recentBookings = [
    { id: '#BK12345', customer: 'Jean Mugisha', route: 'Kigali-Musanze', date: 'Today, 10:30', amount: 'RWF 3,500', status: 'Confirmed' },
    { id: '#BK12346', customer: 'Marie Uwase', route: 'Kigali-Huye', date: 'Today, 09:45', amount: 'RWF 4,200', status: 'Boarding' },
    { id: '#BK12347', customer: 'Patrick Nkusi', route: 'Kigali-Gisenyi', date: 'Today, 08:15', amount: 'RWF 5,000', status: 'Completed' },
    { id: '#BK12348', customer: 'Diane Karenzi', route: 'Kigali-Nyagatare', date: 'Yesterday, 16:20', amount: 'RWF 3,800', status: 'Confirmed' },
    { id: '#BK12349', customer: 'Eric Mutabazi', route: 'Kigali-Rusizi', date: 'Yesterday, 14:05', amount: 'RWF 6,500', status: 'Completed' },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Handle date range change
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="admin-overview">
      <div className="overview-header">
        <h1>Dashboard Overview</h1>
        <div className="overview-actions">
          <select value={dateRange} onChange={handleDateRangeChange} className="date-range-selector">
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
          <button className="refresh-btn">Refresh Data</button>
          <button className="export-btn">Export Report</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        {summaryData.map((item) => (
          <div className="summary-card" key={item.id}>
            <div className="card-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              <span>{item.icon}</span>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <div className="card-value">{item.value}</div>
              <div className={`card-change ${item.trend}`}>
                {item.change}
                <span className="trend-arrow">{item.trend === 'up' ? '↑' : '↓'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-card bookings-chart">
          <h2>Bookings & Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#4299e1" strokeWidth={2} activeDot={{ r: 8 }} name="Bookings" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#f6ad55" strokeWidth={2} name="Revenue (RWF)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card routes-chart">
          <h2>Popular Routes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={routeData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {routeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics - Occupancy */}
      <div className="occupancy-chart-container">
        <div className="chart-card occupancy-chart">
          <h2>Bus Occupancy Rate (by Route)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              {name: 'Kigali-Musanze', occupancy: 85},
              {name: 'Kigali-Huye', occupancy: 90},
              {name: 'Kigali-Gisenyi', occupancy: 75},
              {name: 'Kigali-Nyagatare', occupancy: 60},
              {name: 'Kigali-Rusizi', occupancy: 80},
            ]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupancy" name="Occupancy Rate (%)" fill="#4299e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="tables-container">
        <div className="table-section active-buses">
          <h2>Active Buses Status</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Bus ID</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Occupancy</th>
                  <th>Next Stop</th>
                  <th>Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {busData.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>{bus.route}</td>
                    <td>
                      <span className={`status-badge ${bus.status.toLowerCase().replace(' ', '-')}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td>{bus.occupancy}</td>
                    <td>{bus.nextStop}</td>
                    <td>{bus.arrivalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-section recent-bookings">
          <h2>Recent Bookings</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.route}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Average Trip Duration</h3>
          <div className="stat-value">2h 15m</div>
          <div className="stat-desc">Across all routes</div>
        </div>
        <div className="stat-card">
          <h3>On-Time Performance</h3>
          <div className="stat-value">92%</div>
          <div className="stat-desc">Buses arriving on schedule</div>
        </div>
        <div className="stat-card">
          <h3>Mobile Bookings</h3>
          <div className="stat-value">78%</div>
          <div className="stat-desc">Of all ticket sales</div>
        </div>
        <div className="stat-card">
          <h3>Fuel Efficiency</h3>
          <div className="stat-value">8.6L/100km</div>
          <div className="stat-desc">Fleet average</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;