// Badge and Status Types
export type BadgeStatus =
  | 'Available'
  | 'Booked'
  | 'Reserved'
  | 'Waitlist'
  | 'Clean'
  | 'Dirty'
  | 'Inspected'
  | 'Pick up'
  | 'Ongoing'
  | 'Full'
  | 'Inactive'
  | 'New'
  | 'Paid'
  | 'Pending'
  | 'Overdue';

// Entity Interfaces
export interface Guest {
  id: string;
  name: string;
  room: string;
  total: number;
  paid: number;
  status: BadgeStatus;
}

export interface Room {
  number: string;
  bed: string;
  floor: string;
  facility: string;
  status: BadgeStatus;
}

export interface Deal {
  ref: string;
  name: string;
  reservationsLeft: number;
  endDate: string;
  roomType: string;
  status: BadgeStatus;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  amountDue: number;
  lastPaid: string;
  status: BadgeStatus;
}

export interface Review {
  name: string;
  room: string;
  rating: number;
  date: string;
  text: string;
}

// Component Prop Interfaces
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export interface BadgeProps {
  label: string;
  type?: BadgeStatus;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
}

export interface SelectProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  label?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface StarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface BarChartProps {
  data: { label: string; value: number; percentage: number }[];
  color?: string;
}

export interface GaugeProps {
  percentage: number;
  label: string;
}

export interface PageWrapperProps {
  children: React.ReactNode;
  pageTitle?: string;
  action?: React.ReactNode;
}
