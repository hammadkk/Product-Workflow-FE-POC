import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDashboard from '../pages/ProductList/index';
import NotificationList from '../pages/Notifications';
import FlowPage from '../pages/Flow';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductDashboard />} />
      <Route path="/notifications" element={<NotificationList />} />
       <Route path="/flow" element={<FlowPage />} />
    </Routes>
  );
};

export default AppRoutes;
