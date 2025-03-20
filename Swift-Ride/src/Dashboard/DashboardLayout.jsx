import React from "react";
import { Outlet } from 'react-router-dom';
import DashboardSidebar from "./DashboardSidebar"; 
import DashboardNavbar from "./DashboardNavbar"; 

const DashboardLayout = () => {
  return (
    <div >
      <DashboardSidebar  />
      <DashboardNavbar />  
      <Outlet />  
    </div>
  );
}

export default DashboardLayout;
