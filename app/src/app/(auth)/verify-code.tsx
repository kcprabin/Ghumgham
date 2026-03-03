import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button, NumberPad } from "@/src/components/ui";
import { Colors } from "@/src/constants/color";
import { Typography } from "@/src/constants/typography";
import { Spacing } from "@/src/constants/spacing";

import { API_ENDPOINTS_AUTH } from "@/src/constants/api";
import axios from "axios";

const OTP_LENGTH = 4;

export default function VerifyCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNumberPress = (value: string) => {
    if (otp.length < OTP_LENGTH) {
      setOtp((prev) => prev + value);
    }
  };

  const handleBackspace = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  const handleContinue = async () => {
    if (otp.length !== OTP_LENGTH) return;
    setLoading(true);
    try {
      await axios
        .post(API_ENDPOINTS_AUTH.VERIFY_OTP, {
          email,
          otp,
        })
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
            router.push("/(auth)/success" as any);
          }, 1500);
        })
        .catch((error) => {
          console.error("OTP verification error:", error);
          // Handle error (e.g., show message to user)
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("OTP verification error:", error);
      setLoading(false);
    }
  };

  const isComplete = otp.length === OTP_LENGTH;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.subtitle}>
            We have sent a verification code to{" "}
            <Text style={styles.phoneNumber}>{email}</Text>
          </Text>
        </View>

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
              {otp[index] ? <Text style={styles.otpDot}>•</Text> : null}
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
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginVertical: Spacing.xl,
  },
  otpBox: {
    width: Spacing.otpBoxSize,
    height: Spacing.otpBoxSize,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
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
