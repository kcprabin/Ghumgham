import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import BarChart from '../components/ui/BarChart';
import { getVendors, updateVendorStatus, addVendor } from '../services/api';
import type { Vendor } from '../types';
import { useModal } from '../hooks/useModal';
import { formatCurrency } from '../utils/helpers';

const EarningPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();

  const [vendorForm, setVendorForm] = useState({
    vendorName: '',
    category: 'Food & Beverage',
    amountDue: '',
    contactPerson: '',
    paymentDueDate: '',
  });

  useEffect(() => {
    const fetchVendors = async () => {
      const data = await getVendors();
      setVendors(data);
    };
    fetchVendors();
  }, []);

  const handlePayNow = async (vendorId: string) => {
    const updated = await updateVendorStatus(vendorId, 'Paid');
    if (updated) {
      setVendors(vendors.map((v) => (v.id === vendorId ? updated : v)));
    }
  };

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    const newVendor = await addVendor({
      name: vendorForm.vendorName,
      category: vendorForm.category,
      amountDue: parseFloat(vendorForm.amountDue),
      lastPaid: new Date().toLocaleDateString('en-GB'),
      status: 'Pending',
    });
    setVendors([...vendors, newVendor]);
    setVendorForm({
      vendorName: '',
      category: 'Food & Beverage',
      amountDue: '',
      contactPerson: '',
      paymentDueDate: '',
    });
    closeModal();
  };

  const stats = [
    {
      label: 'Total Revenue',
      value: '$284,500',
      change: '+12%',
      icon: '📈',
      color: 'text-green-600',
      badgeType: 'Available' as const,
    },
    {
      label: 'Pending Payouts',
      value: '$43,200',
      change: 'payment due',
      icon: '⏳',
      color: 'text-orange-600',
      badgeType: 'Pending' as const,
    },
    {
      label: 'Collected This Month',
      value: '$68,900',
      change: 'increase',
      icon: '💳',
      color: 'text-blue-600',
      badgeType: 'Available' as const,
    },
    {
      label: 'Outstanding Balance',
      value: '$11,400',
      change: 'overdue',
      icon: '⚠️',
      color: 'text-red-600',
      badgeType: 'Overdue' as const,
    },
  ];

  const roomTypeRevenue = [
    { label: 'VIP Suit', value: 42000, percentage: 28 },
    { label: 'Double sharing', value: 38000, percentage: 25 },
    { label: 'Single sharing', value: 29000, percentage: 19 },
    { label: 'Triple sharing', value: 21000, percentage: 14 },
  ];

  const revenueBreakdown = [
    {
      source: 'Room Bookings',
      bookings: 524,
      revenue: 198400,
      avgPerBooking: 378,
      growth: '+14%',
    },
    {
      source: 'F&B Services',
      bookings: 312,
      revenue: 34200,
      avgPerBooking: 110,
      growth: '+8%',
    },
    {
      source: 'Spa & Wellness',
      bookings: 156,
      revenue: 28900,
      avgPerBooking: 185,
      growth: '+22%',
    },
    {
      source: 'Event Hall',
      bookings: 48,
      revenue: 15600,
      avgPerBooking: 325,
      growth: '-3%',
    },
    {
      source: 'Miscellaneous',
      bookings: 74,
      revenue: 7400,
      avgPerBooking: 100,
      growth: '+5%',
    },
  ];

  return (
    <PageWrapper pageTitle="Earning">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <Badge label={stat.change} type={stat.badgeType} />
          </Card>
        ))}
      </div>

      {/* Hotel Revenue Section */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Hotel Revenue</h2>
          <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Revenue by Room Type */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Revenue by Room Type
          </h3>
          <BarChart data={roomTypeRevenue} color="#4285F4" />
        </div>

        {/* Revenue Breakdown Table */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Revenue Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Bookings
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Avg per booking
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {revenueBreakdown.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-900">{row.source}</td>
                    <td className="px-4 py-3 text-gray-900">{row.bookings}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {formatCurrency(row.revenue)}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      ${row.avgPerBooking}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          row.growth.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {row.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Vendor Payouts Section */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Vendor Payouts</h2>
          <Button variant="primary" size="sm" onClick={openModal}>
            + Add Vendor
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Vendor ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Vendor Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Amount Due
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Last Paid
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-900">{vendor.id}</td>
                  <td className="px-4 py-3 text-gray-900">{vendor.name}</td>
                  <td className="px-4 py-3 text-gray-900">{vendor.category}</td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(vendor.amountDue)}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{vendor.lastPaid}</td>
                  <td className="px-4 py-3">
                    <Badge label={vendor.status} type={vendor.status} />
                  </td>
                  <td className="px-4 py-3">
                    {vendor.status !== 'Paid' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePayNow(vendor.id)}
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Vendor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Vendor"
      >
        <form onSubmit={handleAddVendor} className="space-y-4">
          <Input
            label="Vendor Name"
            value={vendorForm.vendorName}
            onChange={(e) =>
              setVendorForm({ ...vendorForm, vendorName: e.target.value })
            }
          />
          <Select
            label="Category"
            options={[
              { label: 'Food & Beverage', value: 'Food & Beverage' },
              { label: 'Housekeeping', value: 'Housekeeping' },
              { label: 'Maintenance', value: 'Maintenance' },
              { label: 'Laundry', value: 'Laundry' },
              { label: 'Plumbing', value: 'Plumbing' },
              { label: 'Other', value: 'Other' },
            ]}
            value={vendorForm.category}
            onChange={(e) =>
              setVendorForm({ ...vendorForm, category: e.target.value })
            }
          />
          <Input
            label="Amount Due"
            type="number"
            value={vendorForm.amountDue}
            onChange={(e) =>
              setVendorForm({ ...vendorForm, amountDue: e.target.value })
            }
          />
          <Input
            label="Contact Person"
            value={vendorForm.contactPerson}
            onChange={(e) =>
              setVendorForm({ ...vendorForm, contactPerson: e.target.value })
            }
          />
          <Input
            label="Payment Due Date"
            type="date"
            value={vendorForm.paymentDueDate}
            onChange={(e) =>
              setVendorForm({ ...vendorForm, paymentDueDate: e.target.value })
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

export default EarningPage;
