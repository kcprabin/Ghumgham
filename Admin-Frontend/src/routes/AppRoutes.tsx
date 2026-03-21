import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="bg-gray-50 min-h-screen">
    <Sidebar />
    <Topbar />
    {children}
  </div>
);

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {isLoggedIn ? (
        <Route
          element={
            <AuthenticatedLayout>
              <div />
            </AuthenticatedLayout>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/guests" element={<GuestPage />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/deals" element={<DealPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/earning" element={<EarningPage />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
