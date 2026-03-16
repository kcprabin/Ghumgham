import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, SocialButton, Divider, FormFeedback } from '@/src/components/ui';
import { Colors } from '@/src/constants/app/color';
import { Typography } from '@/src/constants/app/typography';
import { Spacing } from '@/src/constants/app/spacing';
import { API_ENDPOINTS_AUTH } from '@/src/constants/api';
import axios from 'axios';


export default function SignIn() {
  const API_SIGNIN = API_ENDPOINTS_AUTH.LOGIN;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Please enter email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    // Add your sign in logic here
    try {
      const response = await axios.post(API_SIGNIN, {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      setLoading(false);
      // Handle successful sign in
    } catch (error) {
      setLoading(false);
      setErrorMessage('Invalid email or password.');
    }
    setTimeout(() => {
      setLoading(false);
      // Navigate to verification with contact info.
      router.push({
        pathname: '/(auth)/verify-code',
        params: { email: trimmedEmail },
      } as any);
    }, 600);
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup' as any);
  };

  const handlePhoneTab = () => {
    router.replace('/(auth)/signin-phone' as any);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook Sign In');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={handlePhoneTab}>
            <Text style={styles.tabText}>Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Please enter your email address</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <FormFeedback
            message={errorMessage}
            type="error"
            style={styles.feedback}
            onDismiss={() => setErrorMessage('')}
          />

          <Input
            placeholder="Email address"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (errorMessage) setErrorMessage('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.inputContainer}
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (errorMessage) setErrorMessage('');
            }}
            isPassword
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Continue"
            onPress={handleSignIn}
            loading={loading}
            disabled={!email.trim() || !password.trim()}
            style={styles.signInButton}
          />
        </View>

        {/* Social Login */}
        <Divider text="Or Sign In with" style={styles.divider} />
        
        <View style={styles.socialButtons}>
          <SocialButton
            provider="google"
            onPress={handleGoogleSignIn}
          />
          <SocialButton
            provider="facebook"
            onPress={handleFacebookSignIn}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.borderRadius.md,
    padding: 4,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: Spacing.borderRadius.sm,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.buttonText,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  form: {
    gap: Spacing.md,
  },
  inputContainer: {
    marginBottom: Spacing.sm,
  },
  feedback: {
    marginBottom: Spacing.sm,
  },
  signInButton: {
    marginTop: Spacing.md,
  },
  divider: {
    marginVertical: Spacing.lg,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: Spacing.xl,
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  footerLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
});
