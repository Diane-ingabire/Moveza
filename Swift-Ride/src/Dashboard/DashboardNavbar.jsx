import React from "react";
import "./dashboardstyles/DashboardNavbar.css"
import { CiLocationOn } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
const DashboardNavbar =() =>{
    return(
        <nav >
        <div className="dashboardnav" >
            <div className="left_dashboard_nav">
                  <div className="log_dash_nav">
                  <p> <span className="loc-icon"><CiLocationOn/></span>Swift Ride</p>
                  </div>
                  <div className="Find_my_bus">
                     <p>Find my bus</p>
                  </div>
                  <div className="Buy_Tickets">
                    <p>Buy Tickets</p>
                  </div>
            </div>
            <div className="right_dashboard_nav">
                <div className="change_mode">
                    
                    <span ></span>
                </div>
                <div className="icon_dash_nav"> <IoNotifications/></div>
                <div className="profile_nav">G</div>
            </div>
        </div>
        </nav>
    )
}
export default DashboardNavbar