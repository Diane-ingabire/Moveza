import React, { useEffect, useRef } from 'react';
import { 
  User, 
  Calendar, 
  Ticket, 
  History, 
  Settings, 
  Crown, 
  Info, 
  HelpCircle, 
  Users, 
  LogOut 
} from 'lucide-react';
import '../Dashboard/dashboardstyles/menu.css'
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Menu = ({ 
  menuOpen, 
  toggleMenu, 
  onMenuItemClick,
  position = { top: '0px', right: '0px' } // Default positioning
}) => {
  const navigate = useNavigate();
  
    
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      navigate('/LoginPage');  
    };
    

  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(false);
      }
    };

    // Only add listener if menu is open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [menuOpen, toggleMenu]);

  // Handle menu item click
  const handleItemClick = (route) => {
    if (onMenuItemClick) {
      onMenuItemClick(route);
    }
    toggleMenu(false);
  };

  return (
    <div 
      ref={menuRef}
      className={`gerayo-menu ${menuOpen ? 'open' : ''}`}
      style={{
        position: 'fixed',
        ...position
      }}
    >
      <div className="menu-header">
        <div className="user-icon">G</div>
        
        <div className="user-email">guest52138@gmail.com</div>
        <div className="close-button" >
          <X size={24} />
        </div>
      </div>
      <ul className="menu-items">
        <li>
          <li onClick={() => handleItemClick('profile')} className="menu-link">
            <User className="menu-icon" size={20} />
            Your profile
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('bookings')} className="menu-link">
            <Calendar className="menu-icon" size={20} />
            Manage Bookings
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('tickets')} className="menu-link">
            <Ticket className="menu-icon" size={20} />
            Your Tickets
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('purchase-history')} className="menu-link">
            <History className="menu-icon" size={20} />
            Purchase history
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('settings')} className="menu-link">
            <Settings className="menu-icon" size={20} />
            Settings
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('premium')} className="menu-link">
            <Crown className="menu-icon" size={20} />
            Get Premium
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('about')} className="menu-link">
            <Info className="menu-icon" size={20} />
            About Gerayo
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('support')} className="menu-link">
            <HelpCircle className="menu-icon" size={20} />
            Swift-Ride Support
          </li>
        </li>
        <li>
          <li onClick={() => handleItemClick('community')} className="menu-link">
            <Users className="menu-icon" size={20} />
            Swift-Ride Community
          </li>
        </li>
      </ul>
      <div className="menu-footer">
        <div onClick={() => handleLogout('signout')} className="signout-link">
          <LogOut className="menu-icon" size={20}  />
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Menu;