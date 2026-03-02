import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton } from '../components/ui/Button';
import { CustomInput } from '../components/ui/Input';
import { bookingService } from '../services/bookingService';
import { hotelService } from '../services/hotelService';

interface CreateBookingScreenProps {
  navigation: any;
}

interface Hotel {
  _id: string;
  name: string;
  city: string;
}

export const CreateBookingScreen: React.FC<CreateBookingScreenProps> = ({ navigation }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    setLoading(true);
    try {
      const response = await hotelService.getAllHotels();
      if (response.success) {
        setHotels(response.data || []);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
      Alert.alert('Error', 'Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedHotel || !checkIn || !checkOut || !guests) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setCreating(true);
    try {
      const response = await bookingService.createBooking({
        roomId: selectedHotel,
        guests: parseInt(guests),
        checkIn,
        checkOut,
        paymentMethod,
      });

      if (response.success) {
        Alert.alert('Success', 'Booking created successfully!');
        navigation.replace('Home');
      } else {
        Alert.alert('Error', response.message || 'Failed to create booking');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create booking');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Create Booking</Text>
            <Text style={styles.subtitle}>
              Book your accommodation now
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Hotel Selection Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Select Hotel *</Text>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setShowHotelDropdown(!showHotelDropdown)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedHotel
                  ? hotels.find(h => h._id === selectedHotel)?.name
                  : 'Choose a hotel'}
              </Text>
              <Ionicons
                name={showHotelDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Colors.gray}
              />
            </Pressable>

            {showHotelDropdown && (
              <View style={styles.dropdown}>
                {hotels.map(hotel => (
                  <TouchableOpacity
                    key={hotel._id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedHotel(hotel._id);
                      setShowHotelDropdown(false);
                    }}
                  >
                    <View>
                      <Text style={styles.dropdownItemName}>{hotel.name}</Text>
                      <Text style={styles.dropdownItemCity}>{hotel.city}</Text>
                    </View>
                    {selectedHotel === hotel._id && (
                      <Ionicons name="checkmark" size={20} color={Colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Check-in Date */}
          <View>
            <Text style={styles.label}>Check-in Date *</Text>
            <CustomInput
              placeholder="YYYY-MM-DD"
              value={checkIn}
              onChangeText={setCheckIn}
              containerStyle={styles.inputContainer}
              editable={!creating}
            />
          </View>

          {/* Check-out Date */}
          <View>
            <Text style={styles.label}>Check-out Date *</Text>
            <CustomInput
              placeholder="YYYY-MM-DD"
              value={checkOut}
              onChangeText={setCheckOut}
              containerStyle={styles.inputContainer}
              editable={!creating}
            />
          </View>

          {/* Number of Guests */}
          <View>
            <Text style={styles.label}>Number of Guests *</Text>
            <CustomInput
              placeholder="1"
              value={guests}
              onChangeText={setGuests}
              keyboardType="number-pad"
              containerStyle={styles.inputContainer}
              editable={!creating}
            />
          </View>

          {/* Payment Method */}
          <View>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
              {['credit_card', 'debit_card', 'paypal'].map(method => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentMethodOption,
                    paymentMethod === method && styles.paymentMethodOptionActive,
                  ]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View
                    style={[
                      styles.radio,
                      paymentMethod === method && styles.radioActive,
                    ]}
                  />
                  <Text style={styles.paymentMethodText}>
                    {method.replace('_', ' ').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <PrimaryButton
            title={creating ? 'Creating Booking...' : 'Create Booking'}
            onPress={handleCreateBooking}
            disabled={creating || !selectedHotel || !checkIn || !checkOut || !guests}
          />
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  dropdownContainer: {
    gap: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: Colors.black,
    flex: 1,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 250,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  dropdownItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  dropdownItemCity: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
  paymentMethodContainer: {
    gap: 12,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  paymentMethodOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(123, 47, 190, 0.05)',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.gray,
    marginRight: 12,
  },
  radioActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  paymentMethodText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '500',
  },
});
