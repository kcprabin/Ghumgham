import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import Pagination from '../components/ui/Pagination';
import { getDeals, addDeal } from '../services/api';
import type { Deal } from '../types';
import { useModal } from '../hooks/useModal';
import { usePagination } from '../hooks/usePagination';

const DealPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const [formData, setFormData] = useState({
    dealName: '',
    refNumber: '',
    tags: '',
    price: '',
    facilities: '',
    roomType: '',
    discount: '',
    startDate: '',
    endDate: '',
  });

  const pagination = usePagination({ totalItems: deals.length, pageSize: 8 });
  const paginatedDeals = deals.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await getDeals();
      setDeals(data);
    };
    fetchDeals();
  }, []);

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal = await addDeal({
      name: formData.dealName,
      reservationsLeft: 45,
      endDate: formData.endDate,
      roomType: formData.roomType,
      status: 'New',
    });
    setDeals([...deals, newDeal]);
    setFormData({
      dealName: '',
      refNumber: '',
      tags: '',
      price: '',
      facilities: '',
      roomType: '',
      discount: '',
      startDate: '',
      endDate: '',
    });
    closeModal();
  };

  return (
    <PageWrapper
      pageTitle="Deals"
      action={
        <div className="flex gap-3">
          <Button variant="primary" size="md" onClick={openModal}>
            + Add deal
          </Button>
          <Button variant="outline" size="md">
            Filter
          </Button>
        </div>
      }
    >
      <Card>
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {['ongoing', 'finished'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Reference number
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Deal name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Reservations left
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  End date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Room type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedDeals.map((deal) => (
                <tr
                  key={deal.ref}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-900">{deal.ref}</td>
                  <td className="px-4 py-3 text-gray-900">{deal.name}</td>
                  <td className="px-4 py-3 text-gray-900">
                    {deal.reservationsLeft}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{deal.endDate}</td>
                  <td className="px-4 py-3 text-gray-900">{deal.roomType}</td>
                  <td className="px-4 py-3">
                    <Badge label={deal.status} type={deal.status} />
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

      {/* Add Deal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Deal"
      >
        <form onSubmit={handleAddDeal} className="space-y-4">
          <Input
            label="Deal name"
            value={formData.dealName}
            onChange={(e) =>
              setFormData({ ...formData, dealName: e.target.value })
            }
          />
          <Input
            label="Reference number"
            value={formData.refNumber}
            onChange={(e) =>
              setFormData({ ...formData, refNumber: e.target.value })
            }
          />
          <Select
            label="Tags"
            options={[
              { label: 'Family', value: 'family' },
              { label: 'Holiday', value: 'holiday' },
              { label: 'Weekend', value: 'weekend' },
            ]}
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
          />
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room facility
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              rows={3}
              value={formData.facilities}
              onChange={(e) =>
                setFormData({ ...formData, facilities: e.target.value })
              }
            />
          </div>
          <Select
            label="Room type"
            options={[
              { label: 'Single', value: 'single' },
              { label: 'Double', value: 'double' },
              { label: 'Triple', value: 'triple' },
              { label: 'VIP', value: 'vip' },
            ]}
            value={formData.roomType}
            onChange={(e) =>
              setFormData({ ...formData, roomType: e.target.value })
            }
          />
          <Input
            label="Discount (%)"
            type="number"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: e.target.value })
            }
          />
          <Input
            label="Start date"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
          <Input
            label="End date"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
};

export default DealPage;
