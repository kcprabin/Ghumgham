import React from 'react';
import type { StarsProps } from '../../types';

const Stars: React.FC<StarsProps> = ({ rating, size = 'md' }) => {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size];

  return (
    <div className={`flex gap-1 ${sizeClass}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Stars;
