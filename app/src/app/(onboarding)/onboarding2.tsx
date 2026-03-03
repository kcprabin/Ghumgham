import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
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
const ONBOARDING_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800';

export default function Onboarding2() {
  const router = useRouter();

  const handleSkip = () => {
    router.replace('/(auth)/signin' as any);
  };

  const handleNext = () => {
    router.push('/(onboarding)/onboarding3' as any);
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
          <Text style={styles.title}>Global Accessibility</Text>
          <Text style={styles.subtitle}>
            Book hotels anywhere in the world with ease. Access thousands of properties across 190+ countries.
          </Text>
          
          <PaginationDots total={3} current={1} style={styles.pagination} />
          
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