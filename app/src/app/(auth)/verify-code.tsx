import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, NumberPad } from '@/src/components/ui';
import { Colors } from '@/src/constants/color';
import { Typography } from '@/src/constants/typography';
import { Spacing } from '@/src/constants/spacing';

const OTP_LENGTH = 4;

export default function VerifyCode() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulated phone number - in real app, pass this from previous screen
  const phoneNumber = '+1 256 988 001';

  const handleNumberPress = (value: string) => {
    if (otp.length < OTP_LENGTH) {
      setOtp(prev => prev + value);
    }
  };

  const handleBackspace = () => {
    setOtp(prev => prev.slice(0, -1));
  };

  const handleContinue = async () => {
    if (otp.length !== OTP_LENGTH) return;
    
    setLoading(true);
    // Add your verification logic here
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/success' as any);
    }, 1500);
  };

  const isComplete = otp.length === OTP_LENGTH;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.subtitle}>
            We have sent a verification code to{' '}
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>
        </View>

        {/* OTP Display Boxes */}
        <View style={styles.otpContainer}>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.otpBox,
                otp[index] && styles.otpBoxFilled,
                index === otp.length && styles.otpBoxActive,
              ]}
            >
              {otp[index] ? (
                <Text style={styles.otpDot}>•</Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!isComplete}
          loading={loading}
          style={styles.continueButton}
        />
      </View>

      {/* Custom Number Pad */}
      <View style={styles.numpadContainer}>
        <NumberPad
          onPress={handleNumberPress}
          onBackspace={handleBackspace}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  phoneNumber: {
    color: Colors.primary,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginVertical: Spacing.xl,
  },
  otpBox: {
    width: Spacing.otpBoxSize,
    height: Spacing.otpBoxSize,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxActive: {
    borderColor: Colors.primary,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
  },
  otpDot: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },
  continueButton: {
    marginTop: Spacing.md,
  },
  numpadContainer: {
    paddingBottom: Spacing.xl,
  },
});
