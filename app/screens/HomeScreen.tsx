import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { authService } from '../services/authService';
import { hotelService } from '../services/hotelService';
import { bookingService } from '../services/bookingService';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hotels' | 'bookings'>('overview');
  const [user, setUser] = useState<any>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const authUser = await authService.getStoredUser();
      setUser(authUser);
      await Promise.all([loadHotels(), loadBookings()]);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHotels = async () => {
    try {
      const response = await hotelService.getMyHotels();
      if (response.success) {
        setHotels(response.data || []);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
    }
  };

  const loadBookings = async () => {
    try {
      const response = await bookingService.getUserBookings();
      if (response.success) {
        setBookings(response.data || []);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHotel = () => {
    navigation.navigate('CreateHotel');
  };

  const handleCreateBooking = () => {
    navigation.navigate('CreateBooking');
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={40} color={Colors.primary} />
          <View style={styles.cardHeaderContent}>
            <Text style={styles.cardTitle}>{user?.Username || 'User'}</Text>
            <Text style={styles.cardSubtitle}>{user?.email || 'No email'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{hotels.length}</Text>
          <Text style={styles.statLabel}>Hotels</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{bookings.length}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddHotel}>
          <Ionicons name="add-circle" size={24} color={Colors.white} />
          <Text style={styles.actionButtonText}>Add Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCreateBooking}>
          <Ionicons name="calendar" size={24} color={Colors.white} />
          <Text style={styles.actionButtonText}>Make Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const HotelCard = ({ hotel }: { hotel: any }) => (
    <View style={styles.hotelCard}>
      <View style={styles.hotelCardHeader}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Ionicons name="star" size={20} color="#FFD700" />
      </View>
      <Text style={styles.hotelLocation}>{hotel.city}, {hotel.address}</Text>
      <Text style={styles.hotelDescription} numberOfLines={2}>{hotel.description}</Text>
      <View style={styles.hotelFooter}>
        <Text style={styles.roomCount}>{hotel.rooms?.length || 0} Rooms</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const BookingCard = ({ booking }: { booking: any }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingCardHeader}>
        <Text style={styles.bookingHotel}>{booking.hotel?.name || 'Hotel Name'}</Text>
        <View style={[styles.statusBadge, { backgroundColor: booking.status === 'CONFIRMED' ? Colors.success : Colors.primary }]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={16} color={Colors.gray} />
          <Text style={styles.detailText}>
            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people" size={16} color={Colors.gray} />
          <Text style={styles.detailText}>{booking.guests} Guest(s)</Text>
        </View>
      </View>
    </View>
  );

  const renderHotelsTab = () => (
    <View style={styles.tabContent}>
      {hotels.length > 0 ? (
        <FlatList
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <HotelCard hotel={item} />}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="home-outline" size={64} color={Colors.borderGray} />
          <Text style={styles.emptyStateText}>No hotels yet</Text>
          <TouchableOpacity style={styles.emptyStateButton} onPress={handleAddHotel}>
            <Text style={styles.emptyStateButtonText}>Add Your First Hotel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderBookingsTab = () => (
    <View style={styles.tabContent}>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <BookingCard booking={item} />}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={64} color={Colors.borderGray} />
          <Text style={styles.emptyStateText}>No bookings yet</Text>
          <TouchableOpacity style={styles.emptyStateButton} onPress={handleCreateBooking}>
            <Text style={styles.emptyStateButtonText}>Create Your First Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading && !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>{user?.Username || 'User'}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'hotels' && styles.activeTab]}
            onPress={() => setActiveTab('hotels')}
          >
            <Text style={[styles.tabText, activeTab === 'hotels' && styles.activeTabText]}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookings' && styles.activeTab]}
            onPress={() => setActiveTab('bookings')}
          >
            <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>Bookings</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'hotels' && renderHotelsTab()}
        {activeTab === 'bookings' && renderBookingsTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  greeting: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  logoutButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardHeaderContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    flex: 1,
  },
  hotelCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  hotelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
  },
  hotelLocation: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 8,
  },
  hotelDescription: {
    fontSize: 12,
    color: Colors.textGray,
    marginBottom: 12,
    lineHeight: 16,
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  bookingCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  bookingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingHotel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white,
  },
  bookingDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 12,
    color: Colors.textGray,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
    marginTop: 12,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});
