import type {
  Guest,
  Room,
  Deal,
  Vendor,
  Review,
} from '../types';
import { mockGuests, mockRooms, mockDeals, mockVendors, mockReviews } from '../data/mock';

// Simulating API calls with mock data
export const getGuests = async (): Promise<Guest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGuests), 300);
  });
};

export const getRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRooms), 300);
  });
};

export const getDeals = async (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDeals), 300);
  });
};

export const getVendors = async (): Promise<Vendor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVendors), 300);
  });
};

export const getReviews = async (): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReviews), 300);
  });
};

export const updateVendorStatus = async (
  vendorId: string,
  status: string
): Promise<Vendor | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vendor = mockVendors.find((v) => v.id === vendorId);
      if (vendor) {
        vendor.status = status as any;
        resolve(vendor);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const addVendor = async (vendor: Omit<Vendor, 'id'>): Promise<Vendor> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVendor: Vendor = {
        ...vendor,
        id: `#V${String(mockVendors.length + 1).padStart(3, '0')}`,
      };
      mockVendors.push(newVendor);
      resolve(newVendor);
    }, 300);
  });
};

export const addDeal = async (deal: Omit<Deal, 'ref'>): Promise<Deal> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDeal: Deal = {
        ...deal,
        ref: `#DEAL${String(mockDeals.length + 1).padStart(3, '0')}`,
      };
      mockDeals.push(newDeal);
      resolve(newDeal);
    }, 300);
  });
};
