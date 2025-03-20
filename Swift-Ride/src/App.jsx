import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Service from "./Components/Service";
import Ticket from "./Components/Ticket";
import AdminLayout from "./DashboardAdmin/AdminLayout";
import AdminOverview from "./DashboardAdmin/AdminOverview";
import AdminTracking from "./DashboardAdmin/AdminTracking";
import Seats from "./Components/Seats";
import LoginPage from "./Components/LoginPage";
import DashboardOverview from "./Dashboard/DashboardOverview";
import DashboardLayout from "./Dashboard/DashboardLayout";
import { ProtectedRoute, AdminRoute, UserRoute } from "./Components/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 
        {/* Public routes accessible to all users */}
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path="services" element={<Service />} /> 
          <Route path="Seats" element={<Seats />}/>
          <Route path="tickets" element={<Ticket />} />
        </Route>
        
        {/* Public login page */}
        <Route path="LoginPage" element={<LoginPage />} />
        
        {/* Admin routes - only accessible to admins */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="AdminTracking" element={<AdminTracking/>} />
            
            {/* Add more admin routes as needed */}
          </Route>
        </Route>
        
        {/* User routes - only accessible to regular users */}
        <Route element={<UserRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            {/* Add more user routes as needed */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;