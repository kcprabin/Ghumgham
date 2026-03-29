import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HotelDetails {
  ownerName: string;
  hotelName: string;
  hotelDescription: string;
  hotelLocation: string;
  hotelImages: string[];
  propertyType: string;
  verified: boolean;
  VerificationDocuments: string[];
  contactNumber: string;
  isactive: boolean;
  facilities: string[];
  checkinTime: string;
  checkoutTime: string;
  pricePerNight: number;
  rating: number;
  numberOfReviews: number;
  isFeatured: boolean;
}

const HotelSettingsPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails>({
    ownerName: 'Prabin Karki',
    hotelName: 'Travalle test hotelDescription',
    hotelDescription: 'A cozy boutique hotel near the city center with mountain views.',
    hotelLocation: 'Lakeside, Pokhara, Nepal',
    hotelImages: [
      'https://example.com/images/hotel-front.jpg',
      'https://example.com/images/lobby.jpg',
    ],
    propertyType: 'Boutique Hotel',
    verified: false,
    VerificationDocuments: ['https://example.com/docs/business-license.pdf'],
    contactNumber: '9812345678',
    isactive: true,
    facilities: ['Free WiFi', 'Parking', 'Breakfast'],
    checkinTime: '14:00',
    checkoutTime: '12:00',
    pricePerNight: 85,
    rating: 4.3,
    numberOfReviews: 127,
    isFeatured: true,
  });

  const [formData, setFormData] = useState<HotelDetails>(hotelDetails);
  const [facilitiesInput, setFacilitiesInput] = useState(hotelDetails.facilities.join(', '));
  const [imageInput, setImageInput] = useState(hotelDetails.hotelImages.join('\n'));

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('hotelDetails');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHotelDetails(parsed);
      setFormData(parsed);
      setFacilitiesInput(parsed.facilities.join(', '));
      setImageInput(parsed.hotelImages.join('\n'));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = () => {
    const updated = {
      ...formData,
      facilities: facilitiesInput
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f),
      hotelImages: imageInput
        .split('\n')
        .map((i) => i.trim())
        .filter((i) => i),
    };
    setHotelDetails(updated);
    localStorage.setItem('hotelDetails', JSON.stringify(updated));
    setIsEditing(false);
    alert('Hotel details updated successfully!');
  };

  const handleCancel = () => {
    setFormData(hotelDetails);
    setFacilitiesInput(hotelDetails.facilities.join(', '));
    setImageInput(hotelDetails.hotelImages.join('\n'));
    setIsEditing(false);
  };

  const displayData = isEditing ? formData : hotelDetails;

  return (
    <div className="page-header-section">
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div className="page-title" style={{ fontSize: '36px', marginBottom: '8px' }}>
              Hotel Settings
            </div>
            <div className="page-sub" style={{ fontSize: '16px' }}>
              Manage your hotel information and preferences
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={toggleDarkMode}
              style={{
                background: isDarkMode ? 'rgba(0, 212, 255, 0.2)' : 'var(--surface)',
                border: `2px solid ${isDarkMode ? '#00d4ff' : 'var(--border)'}`,
                padding: '10px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 600,
                color: isDarkMode ? '#00d4ff' : 'var(--text)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : '#efefef';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = isDarkMode ? 'rgba(0, 212, 255, 0.2)' : 'var(--surface)';
              }}
            >
              {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              style={{
                background: isEditing ? 'var(--red)' : 'var(--accent)',
                color: isEditing ? '#fff' : '#0f3460',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const color = isEditing ? '#c0392b' : isDarkMode ? '#00e6ff' : 'var(--accent-light)';
                (e.currentTarget as HTMLElement).style.background = color;
              }}
              onMouseLeave={(e) => {
                const color = isEditing ? 'var(--red)' : 'var(--accent)';
                (e.currentTarget as HTMLElement).style.background = color;
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                style={{
                  background: 'var(--green)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#229954';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--green)';
                }}
              >
                ✓ Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Main Settings Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {/* Basic Information */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Basic Information
            </h3>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Owner Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.ownerName}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Hotel Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.hotelName}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Property Type
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.propertyType}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Contact Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.contactNumber}</p>
              )}
            </div>
          </div>

          {/* Location & Pricing */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Location & Pricing
            </h3>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="hotelLocation"
                  value={formData.hotelLocation}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.hotelLocation}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Price Per Night (Rs.)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: 600 }}>Rs. {displayData.pricePerNight}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Check-in Time
              </label>
              {isEditing ? (
                <input
                  type="time"
                  name="checkinTime"
                  value={formData.checkinTime}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.checkinTime}</p>
              )}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Check-out Time
              </label>
              {isEditing ? (
                <input
                  type="time"
                  name="checkoutTime"
                  value={formData.checkoutTime}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.checkoutTime}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
            Description
          </h3>
          {isEditing ? (
            <textarea
              name="hotelDescription"
              value={formData.hotelDescription}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                borderRadius: '8px',
                background: 'var(--surface2)',
                color: 'var(--text)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                outline: 'none',
                minHeight: '140px',
                resize: 'vertical',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
              }}
            />
          ) : (
            <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: '1.7', fontWeight: 500 }}>
              {displayData.hotelDescription}
            </p>
          )}
        </div>

        {/* Facilities & Rating */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Facilities
            </h3>
            {isEditing ? (
              <textarea
                value={facilitiesInput}
                onChange={(e) => setFacilitiesInput(e.target.value)}
                placeholder="Enter facilities separated by commas (e.g., Free WiFi, Parking, Breakfast)"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  background: 'var(--surface2)',
                  color: 'var(--text)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                }}
              />
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {displayData.facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: isDarkMode ? 'rgba(0, 212, 255, 0.15)' : 'rgba(44, 62, 80, 0.08)',
                      color: isDarkMode ? '#00d4ff' : 'var(--accent)',
                      border: `2px solid ${isDarkMode ? '#00d4ff' : 'var(--accent)'}`,
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '15px',
                      fontWeight: 500,
                    }}
                  >
                    {facility}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Rating & Reviews
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Rating
              </label>
              <p style={{ color: isDarkMode ? '#00d4ff' : 'var(--accent)', fontSize: '24px', fontWeight: 700 }}>
                {displayData.rating} / 5.0
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: isDarkMode ? '#00d4ff' : 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Number of Reviews
              </label>
              <p style={{ color: 'var(--text)', fontSize: '16px', fontWeight: 500 }}>{displayData.numberOfReviews} reviews</p>
            </div>
          </div>
        </div>

        {/* Status & Features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Status
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isactive"
                  checked={formData.isactive}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={{ cursor: isEditing ? 'pointer' : 'default', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
                  Hotel Active
                </span>
              </label>
              <p
                style={{
                  fontSize: '13px',
                  color: formData.isactive ? '#22c55e' : '#ef4444',
                  marginTop: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {formData.isactive ? '● Active' : '● Inactive'}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={{ cursor: isEditing ? 'pointer' : 'default', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
                  Verified
                </span>
              </label>
              <p
                style={{
                  color: formData.verified ? '#22c55e' : '#ef4444',
                  marginTop: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {formData.verified ? '● Verified' : '● Not Verified'}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={{ cursor: isEditing ? 'pointer' : 'default', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '16px', color: 'var(--text)', fontWeight: 500 }}>
                  Featured
                </span>
              </label>
              <p
                style={{
                  color: formData.isFeatured ? '#22c55e' : '#ef4444',
                  marginTop: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {formData.isFeatured ? '● Featured' : '● Not Featured'}
              </p>
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '18px', color: 'var(--text)' }}>
              Hotel Images
            </h3>
            {isEditing ? (
              <textarea
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Enter image URLs, one per line"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `2px solid ${isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  background: 'var(--surface2)',
                  color: 'var(--text)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? '#00d4ff' : 'var(--accent)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isDarkMode ? 'rgba(0, 212, 255, 0.3)' : 'var(--border)';
                }}
              />
            ) : (
              <div>
                {displayData.hotelImages.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {displayData.hotelImages.map((img, idx) => (
                      <a
                        key={idx}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '12px',
                          color: 'var(--blue)',
                          textDecoration: 'underline',
                          wordBreak: 'break-all',
                        }}
                      >
                        Image {idx + 1}: {img.substring(0, 50)}...
                      </a>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '14px', color: 'var(--muted)' }}>No images added</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Verification Documents */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px', color: 'var(--text)' }}>
            Verification Documents
          </h3>
          {displayData.VerificationDocuments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {displayData.VerificationDocuments.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: 'var(--blue)',
                    textDecoration: 'underline',
                  }}
                >
                  Document {idx + 1}: {doc.substring(0, 60)}...
                </a>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>No verification documents</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelSettingsPage;
