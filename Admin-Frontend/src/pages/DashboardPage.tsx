import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Gauge from '../components/ui/Gauge';

const DashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const roomTypes = [
    { type: 'Single sharing', booked: 2, total: 30, price: 568, deals: true },
    { type: 'Double sharing', booked: 2, total: 35, price: 1068, deals: true },
    { type: 'Triple sharing', booked: 2, total: 25, price: 1568, deals: false },
    { type: 'VIP Suit', booked: 4, total: 10, price: 2568, deals: false },
  ];

  const feedbackItems = [
    { name: 'Alexander', room: 'A201', msg: 'Excellent service!' },
    { name: 'Sarah', room: 'B304', msg: 'Room was great.' },
    { name: 'Michael', room: 'C112', msg: 'Clean and comfortable.' },
  ];

  return (
    <PageWrapper
      pageTitle={today}
      action={
        <Button variant="primary" size="md">
          + Create booking
        </Button>
      }
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "Today's Check-in", value: '23' },
          { label: 'Check-out', value: '13' },
          { label: 'Total In hotel', value: '60' },
          { label: 'Available room', value: '10' },
          { label: 'Occupied room', value: '90' },
        ].map((stat, idx) => (
          <Card key={idx}>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Room Types */}
      <Card className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Rooms</h3>
        <div className="grid grid-cols-4 gap-4">
          {roomTypes.map((room, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="font-semibold text-gray-900 mb-2">
                {room.type}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {room.booked}/{room.total}
              </div>
              <div className="text-lg font-bold text-blue-500 mb-2">
                ${room.price}/day
              </div>
              {room.deals && <Badge label="2 Deals" type="Ongoing" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Room & Floor Status */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Room Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-500">104</div>
              <div className="text-sm text-gray-600">Occupied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">20</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            {[
              { label: 'Clean', value: '45 rooms', color: 'blue' },
              { label: 'Dirty', value: '32 rooms', color: 'red' },
              { label: 'Inspected', value: '47 rooms', color: 'green' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className={`text-sm font-semibold text-${item.color}-500`}>
                  {item.label}
                </div>
                <div className="text-xs text-gray-600">{item.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Floor Status
          </h3>
          <Gauge percentage={80} label="Occupancy Rate" />
        </Card>
      </div>

      {/* Occupancy & Feedback */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Occupancy Statistics
            </h3>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
              <option>Monthly</option>
            </select>
          </div>
          <div className="flex items-end gap-2 h-32">
            {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map(
              (month, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <div
                    className="bg-blue-500 rounded-t mb-2"
                    style={{
                      height: `${60 + Math.random() * 40}%`,
                    }}
                  />
                  <div className="text-xs text-gray-600">{month}</div>
                </div>
              )
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Customer Feedback
          </h3>
          {feedbackItems.map((feedback, idx) => (
            <div
              key={idx}
              className="pb-3 mb-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex justify-between mb-1">
                <div className="font-semibold text-sm text-gray-900">
                  {feedback.name}
                </div>
                <div className="text-xs text-gray-600">{feedback.room}</div>
              </div>
              <div className="text-sm text-gray-600">{feedback.msg}</div>
            </div>
          ))}
        </Card>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
