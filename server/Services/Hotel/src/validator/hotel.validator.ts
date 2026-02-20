import zod from 'zod';
import mongoose from 'mongoose';

export const createHotelSchema = zod.object({
  userId: zod.string().min(1, 'User ID is required'),
  ownerName: zod.string().min(1, 'Owner name is required'),
  hotelDescription: zod.string().min(1, 'Hotel description is required'),
  hotelLocation: zod.string().min(1, 'Hotel location is required'),
  hotelName: zod.string().min(1, 'Hotel name is required'),
  hotelImages: zod.array(zod.string()).min(1, 'At least one hotel image is required'),
  propertyType: zod.string().min(1, 'Property type is required'),
  verified: zod.boolean().default(false),
  VerificationDocuments: zod.array(zod.string()).min(1, 'At least one verification document is required'),
  contactNumber: zod.string().regex(/^\d{10,}$/, 'Valid contact number (10+ digits) is required'),
  isactive: zod.boolean().default(false),
  facilities: zod.array(zod.string()).min(1, 'At least one facility is required'),
  checkinTime: zod.string().min(1, 'Check-in time is required'),
  checkoutTime: zod.string().min(1, 'Check-out time is required'),
  pricePerNight: zod.number().positive('Price per night must be greater than 0'),
  rating: zod.number().min(0).max(5).default(0),
  numberOfReviews: zod.number().min(0).default(0),

});

export type HotelInput = zod.infer<typeof createHotelSchema>;