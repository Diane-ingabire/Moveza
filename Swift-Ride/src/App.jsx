import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Service from "./Components/Service";
import Ticket from "./Components/Ticket";
import AdminLayout from "./DashboardAdmin/AdminLayout";
import AdminOverview from "./DashboardAdmin/AdminOverview";
import Seats from "./Components/Seats";

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 
       
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path="services" element={<Service />} /> 
          <Route path="Seats" element={<Seats />}/>
          <Route path="tickets" element={<Ticket />} />
        </Route>

        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
