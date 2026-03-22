import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../../utils/helpers';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/guests', label: 'Guest', icon: '👥' },
    { path: '/rooms', label: 'Room', icon: 'R' },
    { path: '/deals', label: 'Deal', icon: '🎁' },
    { path: '/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/earning', label: 'Earning', icon: '💰' },
  ];

  return (
    <div className="fixed left-0 top-0 w-44 h-screen bg-white border-r border-gray-100 pt-6 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pb-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg" />
          <span className="text-lg font-bold text-blue-600">Travallee</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 px-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={classNames(
              'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
