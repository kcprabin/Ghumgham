import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import GuestPage from '../pages/GuestPage';
import RoomPage from '../pages/RoomPage';
import DealPage from '../pages/DealPage';
import ReviewsPage from '../pages/ReviewsPage';
import EarningPage from '../pages/EarningPage';

const AuthenticatedLayout: React.FC = () => (
  <div className="bg-gray-50 min-h-screen">
    <Sidebar />
    <Topbar />
    <Outlet />
  </div>
);

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/guests" element={<GuestPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/deals" element={<DealPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/earning" element={<EarningPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
