import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Drawer from '../components/ui/Drawer';
import Pagination from '../components/ui/Pagination';
import { getGuests } from '../services/api';
import type { Guest } from '../types';
import { usePagination } from '../hooks/usePagination';

const GuestPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState('checkin');

  const pagination = usePagination({ totalItems: guests.length, pageSize: 10 });
  const paginatedGuests = guests.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  useEffect(() => {
    const fetchGuests = async () => {
      const data = await getGuests();
      setGuests(data);
    };
    fetchGuests();
  }, []);

  return (
    <PageWrapper pageTitle="Guests">
      <Card className="mb-6">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {['checkin', 'checkout'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'checkin' ? 'Check in' : 'Check out'}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Input
            placeholder="Search by room number"
            className="flex-1 max-w-xs"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Reservation ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Room Number
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Total amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Amount paid
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedGuests.map((guest) => (
                <tr
                  key={guest.id}
                  onClick={() => setSelectedGuest(guest)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 text-gray-900">{guest.id}</td>
                  <td className="px-4 py-3 text-gray-900">{guest.name}</td>
                  <td className="px-4 py-3 text-gray-900">{guest.room}</td>
                  <td className="px-4 py-3 text-gray-900">${guest.total}</td>
                  <td className="px-4 py-3 text-gray-900">${guest.paid}</td>
                  <td className="px-4 py-3">
                    <Badge label={guest.status} type={guest.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
        />
      </Card>

      {/* Drawer */}
      <Drawer
        isOpen={!!selectedGuest}
        onClose={() => setSelectedGuest(null)}
      >
        {selectedGuest && (
          <div className="space-y-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {selectedGuest.name.charAt(0)}
            </div>

            {[
              { label: 'Guest name', value: selectedGuest.name },
              { label: 'Registration number', value: selectedGuest.id },
              { label: 'Check in date', value: '03/20/2026' },
              { label: 'Room type', value: 'Double Sharing' },
              { label: 'Stay', value: '3 nights' },
              { label: 'Discount', value: '10%' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                <div className="font-semibold text-gray-900">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default GuestPage;
