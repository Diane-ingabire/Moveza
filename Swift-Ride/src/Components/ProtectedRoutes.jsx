import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Protected route component that checks if the user is authenticated
export const ProtectedRoute = ({ redirectPath = '/LoginPage' }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />;
};

// Admin route component that checks if the user has admin role
export const AdminRoute = ({ redirectPath = '/dashboard' }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role');
  
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />;
};

// User route component that checks if the user is not an admin
export const UserRoute = ({ redirectPath = '/admin' }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role');
  
  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;
  }
  
  if (userRole === 'admin') {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />;
};
