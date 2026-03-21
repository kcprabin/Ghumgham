import React from 'react';
import type { BadgeProps } from '../../types';
import { getBadgeColors } from '../../utils/helpers';
import { classNames } from '../../utils/helpers';

const Badge: React.FC<BadgeProps> = ({ label, type = 'Available' }) => {
  const { bg, text } = getBadgeColors(type);

  return (
    <span
      className={classNames(
        'inline-block px-3 py-1 rounded-full text-sm font-medium',
        bg,
        text
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
