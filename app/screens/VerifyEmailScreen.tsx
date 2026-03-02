import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton } from '../components/ui/Button';
import { OTPInput } from '../components/ui/OTPInput';

interface VerifyEmailScreenProps {
  navigation: any;
  route: any;
}

export const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ navigation, route }) => {
  const { email } = route.params || { email: 'user@gmail.com' };
  const [otp, setOtp] = React.useState('');

  const handleVerify = () => {
    if (otp.length === 5) {
      navigation.navigate('CreatePassword');
    }
  };

  const handleChangeEmail = () => {
    navigation.navigate('AddEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.stepIndicator}>Step 2/3</Text>
              <Text style={styles.title}>Verify your email</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.description}>
              We just sent 5 digit code to <Text style={styles.emailText}>{email}</Text>, enter it below.
            </Text>

            <OTPInput
              length={5}
              value={otp}
              onComplete={(completedOtp) => {
                setOtp(completedOtp);
              }}
            />

            <PrimaryButton
              title="Verify email"
              onPress={handleVerify}
              disabled={otp.length !== 5}
              style={styles.button}
            />

            <TouchableOpacity
              onPress={handleChangeEmail}
              style={styles.changeEmailContainer}
            >
              <Text style={styles.changeEmailText}>
                Wrong email? <Text style={styles.changeEmailLink}>Send to different email</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using Classroom, you agree to the{' '}
            <Text style={styles.footerLink}>Terms and Privacy Policy</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerContent: {
    width: '90%',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  description: {
    fontSize: 15,
    color: Colors.textGray,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 20,
  },
  emailText: {
    color: Colors.black,
    fontWeight: '700',
  },
  button: {
    marginVertical: 0,
    marginTop: 8,
  },
  changeEmailContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  changeEmailText: {
    fontSize: 14,
    color: Colors.textGray,
    fontWeight: '500',
  },
  changeEmailLink: {
    color: Colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textGray,
    fontWeight: '500',
    lineHeight: 18,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
