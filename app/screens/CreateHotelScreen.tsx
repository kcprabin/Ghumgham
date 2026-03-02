import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton } from '../components/ui/Button';
import { CustomInput } from '../components/ui/Input';
import { hotelService } from '../services/hotelService';

interface CreateHotelScreenProps {
  navigation: any;
}

export const CreateHotelScreen: React.FC<CreateHotelScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateHotel = async () => {
    if (!name || !city || !address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await hotelService.registerHotel({
        name,
        city,
        address,
        description,
      });

      if (response.success) {
        Alert.alert('Success', 'Hotel registered successfully!');
        navigation.replace('Home');
      } else {
        Alert.alert('Error', response.message || 'Failed to register hotel');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to register hotel');
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={styles.title}>Register Hotel</Text>
            <Text style={styles.subtitle}>
              Add your hotel to GhumGham
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <CustomInput
            placeholder="Hotel Name *"
            value={name}
            onChangeText={setName}
            containerStyle={styles.inputContainer}
            editable={!loading}
          />

          <CustomInput
            placeholder="City *"
            value={city}
            onChangeText={setCity}
            containerStyle={styles.inputContainer}
            editable={!loading}
          />

          <CustomInput
            placeholder="Address *"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.inputContainer}
            editable={!loading}
          />

          <CustomInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            containerStyle={styles.inputContainer}
            editable={!loading}
            multiline
          />

          <PrimaryButton
            title={loading ? 'Registering Hotel...' : 'Register Hotel'}
            onPress={handleCreateHotel}
            disabled={loading || !name || !city || !address}
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
});
