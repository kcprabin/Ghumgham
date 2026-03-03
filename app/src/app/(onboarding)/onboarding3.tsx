import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, PaginationDots } from '@/src/components/ui';
import { Colors } from '@/src/constants/color';
import { Typography } from '@/src/constants/typography';
import { Spacing } from '@/src/constants/spacing';

const { width, height } = Dimensions.get('window');

// Placeholder image URI - replace with backend image (tropical sunset)
const ONBOARDING_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';

export default function Onboarding3() {
  const router = useRouter();

  const handleGetStarted = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem('hasOnboarded', 'true');
    router.replace('/(auth)/signin' as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Full screen background image */}
      <ImageBackground
        source={{ uri: ONBOARDING_IMAGE }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        {/* Bottom card */}
        <View style={styles.card}>
          <Text style={styles.title}>Safe and Secure</Text>
          <Text style={styles.subtitle}>
            Your bookings and payments are protected with industry-leading security. Travel with peace of mind.
          </Text>
          
          <PaginationDots total={3} current={2} style={styles.pagination} />
          
          {/* Get Started Button */}
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopLeftRadius: Spacing.borderRadius.xl,
    borderTopRightRadius: Spacing.borderRadius.xl,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    marginVertical: Spacing.xl,
  },
  getStartedButton: {
    marginTop: Spacing.md,
  },
});