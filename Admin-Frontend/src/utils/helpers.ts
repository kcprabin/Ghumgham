import type { BadgeStatus } from '../types';

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes
    .filter((c) => typeof c === 'string')
    .join(' ');
};

export const getBadgeColors = (status: BadgeStatus): { bg: string; text: string } => {
  const statusMap: Record<BadgeStatus, { bg: string; text: string }> = {
    Available: { bg: 'bg-green-100', text: 'text-green-700' },
    Ongoing: { bg: 'bg-green-100', text: 'text-green-700' },
    New: { bg: 'bg-green-100', text: 'text-green-700' },
    Inspected: { bg: 'bg-green-100', text: 'text-green-700' },
    Paid: { bg: 'bg-green-100', text: 'text-green-700' },
    Booked: { bg: 'bg-red-100', text: 'text-red-700' },
    Full: { bg: 'bg-red-100', text: 'text-red-700' },
    Dirty: { bg: 'bg-red-100', text: 'text-red-700' },
    Overdue: { bg: 'bg-red-100', text: 'text-red-700' },
    Reserved: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Clean: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Waitlist: { bg: 'bg-orange-100', text: 'text-orange-700' },
    Inactive: { bg: 'bg-orange-100', text: 'text-orange-700' },
    'Pick up': { bg: 'bg-orange-100', text: 'text-orange-700' },
    Pending: { bg: 'bg-orange-100', text: 'text-orange-700' },
  };

  return statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
