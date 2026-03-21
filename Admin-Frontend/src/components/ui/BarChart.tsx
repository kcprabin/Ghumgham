import React from 'react';
import type { BarChartProps } from '../../types';

const BarChart: React.FC<BarChartProps> = ({ data, color = '#4285F4' }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="w-32 text-sm font-medium text-gray-700 truncate">
            {item.label}
          </div>
          <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <div className="w-20 text-right text-sm font-semibold text-gray-900">
            ${item.value.toLocaleString()}
          </div>
          <div className="w-16 text-right text-sm text-gray-500">
            {item.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
