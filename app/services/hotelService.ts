import axios from 'axios';
import { API_URL_HOTEL } from '../constants/api';
import * as SecureStore from 'expo-secure-store';

interface HotelData {
  name: string;
  city: string;
  address: string;
  description?: string;
  amenities?: string[];
  images?: string[];
}

interface RoomData {
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  suitetype: string;
  capacity?: number;
  amenities?: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const apiClient = axios.create({
  baseURL: API_URL_HOTEL,
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

export const hotelService = {
  // Register hotel
  registerHotel: async (hotelData: HotelData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/api/v1/hotels/register', hotelData);
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

  // Get all hotels
  getAllHotels: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get('/api/v1/hotels');
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

  // Get hotel by ID
  getHotelById: async (hotelId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/api/v1/hotels/${hotelId}`);
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

  // Get user's hotels
  getMyHotels: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get('/api/v1/hotels/my-hotels');
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

  // Update hotel
  updateHotel: async (hotelId: string, data: Partial<HotelData>): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put(`/api/v1/hotels/${hotelId}`, data);
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

  // Create room
  createRoom: async (hotelId: string, roomData: RoomData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post(`/api/v1/hotels/room/${hotelId}`, roomData);
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

  // Delete room
  deleteRoom: async (hotelId: string, roomId: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.delete(
        `/api/v1/hotels/room/${hotelId}/${roomId}`,
        { data: { password } }
      );
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

  // Get rooms by hotel
  getHotelRooms: async (hotelId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/api/v1/hotels/${hotelId}/rooms`);
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
