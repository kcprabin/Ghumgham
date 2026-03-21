import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stars from '../components/ui/Stars';
import { getReviews } from '../services/api';
import type { Review } from '../types';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const stats = [
    { label: 'Average Rating', value: '4.3★', icon: '⭐' },
    { label: 'Total Reviews', value: '1,284', icon: '💬' },
    { label: 'Response Rate', value: '87%', icon: '✅' },
  ];

  return (
    <PageWrapper pageTitle="Reviews">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Filter Tabs */}
      <Card className="mb-6 pb-0">
        <div className="flex gap-8 border-b border-gray-200">
          {['all', 'positive', 'negative', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Review Cards */}
      {reviews.map((review, idx) => (
        <Card key={idx} className="mb-4">
          <div className="flex justify-between items-start gap-6">
            <div className="flex gap-4 flex-1">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {review.name}
                </div>
                <div className="flex gap-3 items-center mb-2">
                  <Stars rating={review.rating} size="sm" />
                  <span className="text-xs text-gray-600">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">{review.text}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-gray-600 mb-2">
                Room {review.room}
              </div>
              <Button variant="primary" size="sm">
                Reply
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </PageWrapper>
  );
};

export default ReviewsPage;
