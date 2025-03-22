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
import Invoice from './Components/Invoice'
import LoginPage from "./Components/LoginPage";
import DashboardOverview from "./Dashboard/DashboardOverview";
import DashboardLayout from "./Dashboard/DashboardLayout";
import { ProtectedRoute, AdminRoute, UserRoute } from "./Components/ProtectedRoutes";
import CheckOut from "./Components/CheckOut";
import AdminBuses from "./DashboardAdmin/AdminBuses";
import ManagePassengers from "./DashboardAdmin/ManagePassengers";
import AdminBooking from "./DashboardAdmin/AdminBooking";
import Reports from "./DashboardAdmin/Reports";
import AdminSettings from "./DashboardAdmin/AdminSettings";
import AdminEmails from "./DashboardAdmin/Adminemails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 
        {/* Public routes accessible to all users */}
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path="services" element={<Service />} /> 
          <Route path="Seats" element={<Seats />}/>
          <Route path="Invoice" element={<Invoice />}/>
          <Route path="tickets" element={<Ticket />} />
          <Route path="Checkout" element={<CheckOut />}/>
     

        </Route>
        
        {/* Public login page */}
        <Route path="LoginPage" element={<LoginPage />} />
        
        
        {/* Admin routes - only accessible to admins */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="AdminTracking" element={<AdminTracking/>} />
            <Route path="buses" element={<AdminBuses/>} />
            <Route path="users" element={<ManagePassengers/>} />
            <Route path="bookings" element={<AdminBooking/>} />
            <Route path="reports" element={<Reports/>} />
            <Route path="settings" element={<AdminSettings />}/>

            {/* Add more admin routes as needed */}
          </Route>
          <Route path="Adminemails" element={<AdminEmails />} />
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