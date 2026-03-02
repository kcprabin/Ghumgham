import axios from 'axios';
import { API_URL_BOOKING } from '../constants/api';
import * as SecureStore from 'expo-secure-store';

interface BookingData {
  roomId: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  paymentMethod: string;
  specialRequests?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const apiClient = axios.create({
  baseURL: API_URL_BOOKING,
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bookingService = {
  // Create booking
  createBooking: async (bookingData: BookingData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/api/v1/bookings/create', bookingData);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Get user bookings
  getUserBookings: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get('/api/v1/bookings/my-bookings');
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/api/v1/bookings/${bookingId}`);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post(`/api/v1/bookings/${bookingId}/cancel`);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Update booking
  updateBooking: async (bookingId: string, data: Partial<BookingData>): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put(`/api/v1/bookings/${bookingId}`, data);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Get available rooms
  getAvailableRooms: async (hotelId: string, checkIn: string, checkOut: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/api/v1/bookings/available-rooms/${hotelId}`, {
        params: { checkIn, checkOut },
      });
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Initialize payment
  initializePayment: async (bookingId: string, paymentData: any): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post(`/api/v1/bookings/${bookingId}/payment`, paymentData);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },
};
