import React, { useState } from "react";
import "./AdminStyles/adminoverview.css";
import { Link } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaRegClipboard, FaBus, FaChartBar } from "react-icons/fa6";

const AdminOverview = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [filteredReports, setFilteredReports] = useState([]);
    
    const admin_actions = [
        { id: "1", name: "Manage Buses", icon: <FaBus />, link: "/admin/manage-buses" },
        { id: "2", name: "View Reports", icon: <FaRegClipboard />, link: "/admin/reports" },
        { id: "3", name: "Monitor Bookings", icon: <FaChartBar />, link: "/admin/bookings" }
    ];

    const report_logs = [
        { id: "RPT843Kg", category: "System Issue", details: "Bus tracking system downtime", status: "Resolved" },
        { id: "RPT912Ab", category: "Payment Issue", details: "Failed transactions detected", status: "Pending" },
        { id: "RPT781Xy", category: "User Complaint", details: "Delayed departure", status: "Investigating" }
    ];

    let filteredData = report_logs;
    if (selectedFilter !== "all") {
        filteredData = report_logs.filter(report => report.status.toLowerCase() === selectedFilter);
    }

    return (
        <div className="admin_overview_container">
            <div className="admin_dash_over_container">
                <div className='admin_upper'>
                    <h2>Admin Dashboard</h2>
                    <p>Monitor and manage bus operations effectively.</p>
                </div>
                
                <div className="admin_actions">
                    {admin_actions.map((action) => (
                        <Link key={action.id} to={action.link} className="admin_action_card">
                            <div className="icon">{action.icon}</div>
                            <p>{action.name}</p>
                        </Link>
                    ))}
                </div>

                <div className='admin_filters'>
                    <div className={`filter_option ${selectedFilter === "all" ? "active" : ""}`} onClick={() => setSelectedFilter("all")}>
                        All Reports
                    </div>
                    <div className={`filter_option ${selectedFilter === "pending" ? "active" : ""}`} onClick={() => setSelectedFilter("pending")}>
                        Pending Reports
                    </div>
                    <div className={`filter_option ${selectedFilter === "resolved" ? "active" : ""}`} onClick={() => setSelectedFilter("resolved")}>
                        Resolved Reports
                    </div>
                </div>

                <div className="report_logs">
                    {filteredData.length > 0 ? (
                        filteredData.map((report) => (
                            <div key={report.id} className="report_card">
                                <p><strong>ID:</strong> {report.id}</p>
                                <p><strong>Category:</strong> {report.category}</p>
                                <p><strong>Details:</strong> {report.details}</p>
                                <p><strong>Status:</strong> {report.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reports available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
