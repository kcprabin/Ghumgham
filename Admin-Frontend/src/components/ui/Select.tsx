import React from 'react';
import type { SelectProps } from '../../types';
import { classNames } from '../../utils/helpers';

const Select: React.FC<SelectProps> = ({
  options,
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
      <select
        value={value}
        onChange={onChange}
        className={classNames(
          'w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors',
          'bg-white',
          className
        )}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
