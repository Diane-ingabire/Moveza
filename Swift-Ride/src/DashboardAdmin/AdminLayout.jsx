import React from "react";
import {Outlet} from 'react-router-dom'

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout =()=>{
 return(
    <>
    <AdminSidebar/>
   <AdminNavbar/>
   <Outlet/>
  
   
    </>
 )
}
export default AdminLayout;