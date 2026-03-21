import React from 'react';
import type { DrawerProps } from '../../types';

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="mb-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
