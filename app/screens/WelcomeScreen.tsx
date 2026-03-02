import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton, SecondaryButton, SocialButton } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleContinueWithEmail = () => {
    navigation.navigate('CreateAccount');
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleLogin = () => {
    // Navigate to login screen (to be created)
    console.log('Navigate to login');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.overlay} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to{'\n'}Classroom</Text>
          <Text style={styles.subtitle}>
            Join over 10,000 learners over the World and enjoy unlimited education
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <PrimaryButton
            title="Continue with email"
            onPress={handleContinueWithEmail}
          />

          <Divider isDark containerStyle={styles.divider} />

          <SocialButton
            title="Continue with Apple"
            onPress={() => handleSocialLogin('Apple')}
            icon={<Ionicons name="logo-apple" size={20} color={Colors.black} />}
          />
          <SocialButton
            title="Continue with Facebook"
            onPress={() => handleSocialLogin('Facebook')}
            icon={<Ionicons name="logo-facebook" size={20} color="#1877F2" />}
          />
          <SocialButton
            title="Continue with Google"
            onPress={() => handleSocialLogin('Google')}
            icon={<FontAwesome name="google" size={18} color="#EA4335" />}
          />

          <SecondaryButton
            title="Create an account"
            onPress={handleCreateAccount}
            style={styles.createAccountButton}
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginTextBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#4A1A6F',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    minHeight: height,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    lineHeight: 22,
  },
  buttonsContainer: {
    marginVertical: 20,
  },
  divider: {
    marginVertical: 24,
  },
  createAccountButton: {
    marginTop: 16,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loginText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
  },
  loginTextBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
