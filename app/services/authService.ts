import axios, { AxiosError } from 'axios';
import { API_URL_AUTH } from '../constants/api';
import * as SecureStore from 'expo-secure-store';

interface LoginCredentials {
  Username: string;
  password: string;
}

interface RegisterCredentials {
  Name: string;
  Username: string;
  email: string;
  password: string;
}

interface UserResponse {
  success: boolean;
  message: string;
  data?: any;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

const apiClient = axios.create({
  baseURL: API_URL_AUTH,
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Register user
  register: async (credentials: RegisterCredentials): Promise<UserResponse> => {
    try {
      const response = await apiClient.post('/api/v1/users/register', credentials);
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

  // Login user
  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    try {
      const response = await apiClient.post('/api/v1/users/login', credentials);
      if (response.data.success) {
        const token = response.headers.authorization?.split(' ')[1] || response.data.data?.token;
        if (token) {
          await SecureStore.setItemAsync(TOKEN_KEY, token);
          await SecureStore.setItemAsync(USER_KEY, JSON.stringify(response.data.data));
        }
      }
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

  // Logout user
  logout: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.post('/api/v1/users/logout');
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Get user profile
  getUserProfile: async (): Promise<UserResponse> => {
    try {
      const response = await apiClient.get('/api/v1/users/profile');
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

  // Update user profile
  updateUserProfile: async (data: any): Promise<UserResponse> => {
    try {
      const response = await apiClient.put('/api/v1/users/profile', data);
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

  // Get stored token
  getToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  // Get stored user
  getStoredUser: async (): Promise<any> => {
    const user = await SecureStore.getItemAsync(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return !!token;
  },
};
