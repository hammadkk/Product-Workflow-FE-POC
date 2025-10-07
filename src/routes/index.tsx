import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDashboard from '../pages/ProductList/ProductDashboard';
import NotificationList from '../pages/Notifications';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductDashboard />} />
      <Route path="/notifications" element={<NotificationList />} />
    </Routes>
  );
};

export default AppRoutes;
