import React, { useState, useEffect } from 'react';
import './AdminStyles/reports.css';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const Reports = () => {
  // Sample data - In a real application, this would come from an API
  const [dateRange, setDateRange] = useState('weekly');
  const [reportType, setReportType] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);

  // Sample revenue data
  const revenueData = {
    daily: [
      { day: 'Mon', revenue: 12500, bookings: 125 },
      { day: 'Tue', revenue: 13200, bookings: 132 },
      { day: 'Wed', revenue: 14800, bookings: 148 },
      { day: 'Thu', revenue: 11900, bookings: 119 },
      { day: 'Fri', revenue: 16700, bookings: 167 },
      { day: 'Sat', revenue: 18900, bookings: 189 },
      { day: 'Sun', revenue: 15600, bookings: 156 }
    ],
    weekly: [
      { week: 'Week 1', revenue: 84000, bookings: 840 },
      { week: 'Week 2', revenue: 92000, bookings: 920 },
      { week: 'Week 3', revenue: 88000, bookings: 880 },
      { week: 'Week 4', revenue: 96000, bookings: 960 }
    ],
    monthly: [
      { month: 'Jan', revenue: 320000, bookings: 3200 },
      { month: 'Feb', revenue: 290000, bookings: 2900 },
      { month: 'Mar', revenue: 340000, bookings: 3400 },
      { month: 'Apr', revenue: 380000, bookings: 3800 },
      { month: 'May', revenue: 400000, bookings: 4000 },
      { month: 'Jun', revenue: 450000, bookings: 4500 }
    ]
  };

  // Sample bus utilization data
  const utilizationData = [
    { name: 'Occupied Seats', value: 75 },
    { name: 'Empty Seats', value: 25 }
  ];

  // Sample popular routes data
  const routesData = [
    { route: 'Kigali - Musanze', bookings: 420, revenue: 42000 },
    { route: 'Kigali - Huye', bookings: 380, revenue: 38000 },
    { route: 'Kigali - Rubavu', bookings: 350, revenue: 35000 },
    { route: 'Kigali - Rusizi', bookings: 310, revenue: 31000 },
    { route: 'Kigali - Nyagatare', bookings: 280, revenue: 28000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Simulate loading data
  useEffect(() => {
    if (dateRange || reportType) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [dateRange, reportType]);

  // Function to get appropriate data based on selected range
  const getCurrentData = () => {
    return revenueData[dateRange] || [];
  };

  // Function to get x-axis data key based on selected range
  const getXAxisDataKey = () => {
    switch (dateRange) {
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'day';
    }
  };

  // Function to export reports
  const exportReport = (format) => {
    // Implementation would connect to real export functionality
    alert(`Exporting report in ${format} format`);
  };

  // Function to format currency
  const formatCurrency = (value) => {
    return `RWF ${value.toLocaleString()}`;
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Performance Reports</h1>
        <p>Analyze your bus operation performance and make data-driven decisions</p>
      </div>

      <div className="reports-controls">
        <div className="control-group">
          <label>Date Range:</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="daily">Daily (Last 7 days)</option>
            <option value="weekly">Weekly (Last 4 weeks)</option>
            <option value="monthly">Monthly (Last 6 months)</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>Report Type:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="revenue">Revenue Analysis</option>
            <option value="bookings">Booking Trends</option>
            <option value="buses">Bus Utilization</option>
            <option value="routes">Popular Routes</option>
          </select>
        </div>

        <div className="export-controls">
          <button onClick={() => exportReport('pdf')} className="export-btn">
            Export PDF
          </button>
          <button onClick={() => exportReport('csv')} className="export-btn">
            Export CSV
          </button>
        </div>
      </div>

      <div className="reports-content">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading report data...</p>
          </div>
        ) : (
          <>
            {/* Revenue Analysis Report */}
            {reportType === 'revenue' && (
              <div className="report-card">
                <h2>Revenue Analysis</h2>
                <div className="report-stats">
                  <div className="stat-box">
                    <h3>Total Revenue</h3>
                    <p className="stat-value">{formatCurrency(getCurrentData().reduce((sum, item) => sum + item.revenue, 0))}</p>
                  </div>
                  <div className="stat-box">
                    <h3>Average Revenue</h3>
                    <p className="stat-value">{formatCurrency(getCurrentData().reduce((sum, item) => sum + item.revenue, 0) / getCurrentData().length)}</p>
                  </div>
                  <div className="stat-box">
                    <h3>Growth</h3>
                    <p className="stat-value positive">+8.5%</p>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getCurrentData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={getXAxisDataKey()} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RWF ${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" name="Revenue (RWF)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Booking Trends Report */}
            {reportType === 'bookings' && (
              <div className="report-card">
                <h2>Booking Trends</h2>
                <div className="report-stats">
                  <div className="stat-box">
                    <h3>Total Bookings</h3>
                    <p className="stat-value">{getCurrentData().reduce((sum, item) => sum + item.bookings, 0)}</p>
                  </div>
                  <div className="stat-box">
                    <h3>Avg. Daily Bookings</h3>
                    <p className="stat-value">{Math.round(getCurrentData().reduce((sum, item) => sum + item.bookings, 0) / getCurrentData().length)}</p>
                  </div>
                  <div className="stat-box">
                    <h3>Growth</h3>
                    <p className="stat-value positive">+12.3%</p>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getCurrentData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={getXAxisDataKey()} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bookings" stroke="#00C49F" name="Number of Bookings" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Bus Utilization Report */}
            {reportType === 'buses' && (
              <div className="report-card">
                <h2>Bus Utilization</h2>
                <div className="report-stats">
                  <div className="stat-box">
                    <h3>Average Occupancy</h3>
                    <p className="stat-value">75%</p>
                  </div>
                  <div className="stat-box">
                    <h3>Total Buses</h3>
                    <p className="stat-value">42</p>
                  </div>
                  <div className="stat-box">
                    <h3>On-Time Rate</h3>
                    <p className="stat-value positive">92%</p>
                  </div>
                </div>
                <div className="utilization-container">
                  <div className="pie-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={utilizationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {utilizationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bus-stats">
                    <h3>Bus Performance</h3>
                    <table className="stats-table">
                      <thead>
                        <tr>
                          <th>Bus ID</th>
                          <th>Route</th>
                          <th>Avg. Occupancy</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>BUS-001</td>
                          <td>Kigali - Musanze</td>
                          <td>82%</td>
                          <td><span className="status-active">Active</span></td>
                        </tr>
                        <tr>
                          <td>BUS-002</td>
                          <td>Kigali - Huye</td>
                          <td>78%</td>
                          <td><span className="status-active">Active</span></td>
                        </tr>
                        <tr>
                          <td>BUS-003</td>
                          <td>Kigali - Rubavu</td>
                          <td>85%</td>
                          <td><span className="status-active">Active</span></td>
                        </tr>
                        <tr>
                          <td>BUS-004</td>
                          <td>Kigali - Rusizi</td>
                          <td>72%</td>
                          <td><span className="status-maintenance">Maintenance</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Popular Routes Report */}
            {reportType === 'routes' && (
              <div className="report-card">
                <h2>Popular Routes Analysis</h2>
                <div className="report-stats">
                  <div className="stat-box">
                    <h3>Most Popular</h3>
                    <p className="stat-value">Kigali - Musanze</p>
                  </div>
                  <div className="stat-box">
                    <h3>Highest Revenue</h3>
                    <p className="stat-value">Kigali - Musanze</p>
                  </div>
                  <div className="stat-box">
                    <h3>Growing Route</h3>
                    <p className="stat-value">Kigali - Rubavu</p>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={routesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="route" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Number of Bookings" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (RWF)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="routes-table">
                  <h3>Route Performance</h3>
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Route</th>
                        <th>Bookings</th>
                        <th>Revenue</th>
                        <th>Avg. Occupancy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routesData.map((route, index) => (
                        <tr key={index}>
                          <td>{route.route}</td>
                          <td>{route.bookings}</td>
                          <td>{formatCurrency(route.revenue)}</td>
                          <td>{85 - index * 3}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;