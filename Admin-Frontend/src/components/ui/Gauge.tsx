import React from 'react';
import type { GaugeProps } from '../../types';

const Gauge: React.FC<GaugeProps> = ({ percentage, label }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-20">
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full"
        >
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#4285F4"
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
          />
          {/* Center text */}
          <text
            x="100"
            y="55"
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#1a1a2e"
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default Gauge;
