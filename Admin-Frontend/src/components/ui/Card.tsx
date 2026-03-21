import React from 'react';
import type { CardProps } from '../../types';
import { classNames } from '../../utils/helpers';

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-lg shadow-sm border border-gray-100 p-6',
        'hover:shadow-md transition-shadow',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
