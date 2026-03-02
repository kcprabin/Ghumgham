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
import { CustomInput } from '../components/ui/Input';

interface AddEmailScreenProps {
  navigation: any;
}

export const AddEmailScreen: React.FC<AddEmailScreenProps> = ({ navigation }) => {
  const [email, setEmail] = React.useState('');

  const handleContinue = () => {
    if (email.includes('@')) {
      navigation.navigate('VerifyEmail', { email });
    }
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
              <Text style={styles.stepIndicator}>Step 1/3</Text>
              <Text style={styles.title}>Add your email</Text>
            </View>
          </View>

          <View style={styles.content}>
            <CustomInput
              label="Email"
              placeholder="user@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
            />

            <PrimaryButton
              title="Create an account"
              onPress={handleContinue}
              disabled={!email.includes('@')}
              style={styles.button}
            />
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
  inputContainer: {
    marginBottom: 24,
  },
  button: {
    marginVertical: 0,
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
