import React from 'react';
import type { InputProps } from '../../types';
import { classNames } from '../../utils/helpers';

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(
          'w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors',
          className
        )}
      />
    </div>
  );
};

export default Input;
