import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { getRooms } from '../services/api';
import type { Room } from '../types';
import { usePagination } from '../hooks/usePagination';

const RoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const pagination = usePagination({ totalItems: rooms.length, pageSize: 8 });
  const paginatedRooms = rooms.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  return (
    <PageWrapper
      pageTitle="Rooms"
      action={
        <Button variant="primary" size="md">
          + Add room
        </Button>
      }
    >
      <Card>
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {[
            { id: 'all', label: 'All room(100)' },
            { id: 'available', label: 'Available room(20)' },
            { id: 'booked', label: 'Booked(80)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Room number
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Bed type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Room floor
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Room facility
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRooms.map((room) => (
                <tr
                  key={room.number}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-900">{room.number}</td>
                  <td className="px-4 py-3 text-gray-900">{room.bed}</td>
                  <td className="px-4 py-3 text-gray-900">Floor {room.floor}</td>
                  <td className="px-4 py-3 text-gray-900 text-xs">
                    {room.facility}
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={room.status} type={room.status} />
                  </td>
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
    </PageWrapper>
  );
};

export default RoomPage;
