import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-44 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-40">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 max-w-sm px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />

      {/* Right Icons */}
      <div className="flex items-center gap-6 ml-6">
        <button className="text-gray-600 hover:text-gray-900 text-xl">
          🔔
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </div>
    </div>
  );
};

export default Topbar;
