import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, PaginationDots } from '@/src/components/ui';
import { Colors } from '@/src/constants/color';
import { Typography } from '@/src/constants/typography';
import { Spacing } from '@/src/constants/spacing';

const { width, height } = Dimensions.get('window');

// Placeholder image URI - replace with backend image
const ONBOARDING_IMAGE = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800';

export default function Onboarding1() {
  const router = useRouter();

  const handleSkip = () => {
    router.replace('/(auth)/signin' as any);
  };

  const handleNext = () => {
    router.push('/(onboarding)/onboarding2' as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Image from backend */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: ONBOARDING_IMAGE }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Discover Amazing Places</Text>
        <Text style={styles.subtitle}>
          Find the best hotels, resorts, and vacation rentals around the world
        </Text>
        
        <PaginationDots total={3} current={0} style={styles.pagination} />
        
        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Button
            title="Next"
            onPress={handleNext}
            fullWidth={false}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: width,
    height: height * 0.55,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: Spacing.borderRadius.xl,
    borderTopRightRadius: Spacing.borderRadius.xl,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    marginTop: -Spacing.xl,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  skipButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  nextButton: {
    paddingHorizontal: Spacing.xxl,
  },
});