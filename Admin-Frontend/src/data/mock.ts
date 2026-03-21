import type {
  Guest,
  Room,
  Deal,
  Vendor,
  Review,
} from '../types';

export const mockGuests: Guest[] = [
  { id: 'RES001', name: 'John Doe', room: 'A101', total: 450, paid: 450, status: 'Clean' },
  { id: 'RES002', name: 'Jane Smith', room: 'B202', total: 600, paid: 300, status: 'Dirty' },
  { id: 'RES003', name: 'Bob Johnson', room: 'C303', total: 750, paid: 750, status: 'Inspected' },
  { id: 'RES004', name: 'Alice Brown', room: 'D404', total: 500, paid: 250, status: 'Pick up' },
  { id: 'RES005', name: 'Charlie Davis', room: 'E505', total: 800, paid: 800, status: 'Clean' },
  { id: 'RES006', name: 'Eve Wilson', room: 'F606', total: 550, paid: 0, status: 'Dirty' },
  { id: 'RES007', name: 'Frank Miller', room: 'G707', total: 900, paid: 900, status: 'Inspected' },
  { id: 'RES008', name: 'Grace Taylor', room: 'H808', total: 650, paid: 325, status: 'Clean' },
  { id: 'RES009', name: 'Henry Anderson', room: 'I909', total: 700, paid: 700, status: 'Pick up' },
  { id: 'RES010', name: 'Iris Thomas', room: 'J1010', total: 550, paid: 275, status: 'Dirty' },
];

export const mockRooms: Room[] = [
  { number: '#001', bed: 'Single', floor: '1', facility: 'Wifi, AC, TV', status: 'Available' },
  { number: '#002', bed: 'Double', floor: '1', facility: 'Wifi, AC, TV, Bathroom', status: 'Booked' },
  { number: '#003', bed: 'Single', floor: '2', facility: 'Wifi, AC, TV', status: 'Reserved' },
  { number: '#004', bed: 'Twin', floor: '2', facility: 'Wifi, AC, TV, Bathroom', status: 'Available' },
  { number: '#005', bed: 'Double', floor: '3', facility: 'Wifi, AC, TV, Bathroom, Balcony', status: 'Booked' },
  { number: '#006', bed: 'Single', floor: '3', facility: 'Wifi, AC, TV', status: 'Waitlist' },
  { number: '#007', bed: 'Twin', floor: '4', facility: 'Wifi, AC, TV, Bathroom, Gym', status: 'Available' },
  { number: '#008', bed: 'Double', floor: '5', facility: 'Wifi, AC, TV, Bathroom, Balcony, Spa', status: 'Booked' },
];

export const mockDeals: Deal[] = [
  { ref: '#DEAL001', name: 'Family deal', reservationsLeft: 45, endDate: '2026-04-30', roomType: 'Double', status: 'Ongoing' },
  { ref: '#DEAL002', name: 'Christmas deal', reservationsLeft: 0, endDate: '2025-12-25', roomType: 'Single', status: 'Full' },
  { ref: '#DEAL003', name: 'Family deal', reservationsLeft: 12, endDate: '2026-02-28', roomType: 'Triple', status: 'Inactive' },
  { ref: '#DEAL004', name: 'Black Friday', reservationsLeft: 28, endDate: '2026-11-30', roomType: 'VIP', status: 'New' },
];

export const mockVendors: Vendor[] = [
  { id: '#V001', name: 'FreshMart Supplies', category: 'Food & Beverage', amountDue: 8400, lastPaid: '01/03/24', status: 'Pending' },
  { id: '#V002', name: 'CleanPro Services', category: 'Housekeeping', amountDue: 3200, lastPaid: '15/03/24', status: 'Paid' },
  { id: '#V003', name: 'TechFix Solutions', category: 'Maintenance', amountDue: 5600, lastPaid: '20/02/24', status: 'Overdue' },
  { id: '#V004', name: 'GreenLeaf Laundry', category: 'Laundry', amountDue: 1800, lastPaid: '10/03/24', status: 'Paid' },
  { id: '#V005', name: 'AquaFlow Plumbing', category: 'Plumbing', amountDue: 4100, lastPaid: '28/02/24', status: 'Pending' },
  { id: '#V006', name: 'SkyHigh Elevators', category: 'Maintenance', amountDue: 9200, lastPaid: '05/01/24', status: 'Overdue' },
];

export const mockReviews: Review[] = [
  {
    name: 'Alexander',
    room: 'A201',
    rating: 5,
    date: '2026-03-20',
    text: 'Excellent service, the room was spotless and staff were incredibly helpful.',
  },
  {
    name: 'Sarah',
    room: 'B304',
    rating: 3,
    date: '2026-03-19',
    text: 'Room was okay but the AC wasn\'t working properly. Staff resolved it quickly though.',
  },
  {
    name: 'Michael',
    room: 'C112',
    rating: 4,
    date: '2026-03-18',
    text: 'Great location and clean rooms. Breakfast could have more variety.',
  },
  {
    name: 'Priya',
    room: 'A405',
    rating: 5,
    date: '2026-03-17',
    text: 'Absolutely loved the VIP suite. Will definitely be coming back!',
  },
  {
    name: 'James',
    room: 'D201',
    rating: 2,
    date: '2026-03-16',
    text: 'Check-in took too long and the room wasn\'t ready on time.',
  },
];
