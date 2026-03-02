import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton, SocialButton } from '../components/ui/Button';
import { CustomInput } from '../components/ui/Input';
import { Divider } from '../components/ui/Divider';
import axios from 'axios';
import { API_URL_AUTH } from '../constants/api';

interface CreateAccountScreenProps {
  navigation: any;
}

const register = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/api/v1/users/register`, { email });
    console.log('Registration response:', response.data);
  } catch (error) {
    console.error('Registration error:', error);
  }
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation }) => {
  const [email, setEmail] = React.useState('');

  const handleContinueWithEmail = () => {
    navigation.navigate('AddEmail');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign up with ${provider}`);
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
            <Text style={styles.title}>Create new account</Text>
            <Text style={styles.subtitle}>
              Begin with creating new free account. Don't worry, it's just a few steps.
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <CustomInput
            placeholder="user@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
          />

          <PrimaryButton
            title="Continue with email"
            onPress={handleContinueWithEmail}
            disabled={!email.includes('@')}
          />

          <Divider />

          <SocialButton
            title="Continue with Apple"
            onPress={() => handleSocialLogin('Apple')}
            icon={<Ionicons name="logo-apple" size={20} color={Colors.black} />}
          />
          <SocialButton
            title="Continue with Google"
            onPress={() => handleSocialLogin('Google')}
            icon={<FontAwesome name="google" size={18} color="#EA4335" />}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textGray,
    fontWeight: '500',
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
});
