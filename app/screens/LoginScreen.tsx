import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PrimaryButton } from '../components/ui/Button';
import { CustomInput } from '../components/ui/Input';
import { Divider } from '../components/ui/Divider';
import axios from 'axios';
import { API_URL_AUTH } from '../constants/api';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL_AUTH}/api/v1/users/login`,
        {
          Username: username,
          password: password,
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Login successful');
        // Navigate to home or dashboard
        navigation.replace('Home');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.';
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <CustomInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            containerStyle={styles.inputContainer}
            editable={!loading}
          />

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              containerStyle={styles.inputContainer}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={loading}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title={loading ? 'Signing in...' : 'Sign In'}
            onPress={handleLogin}
            disabled={loading || !username || !password}
          />

          <Divider />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.signupLink}>Create one</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  inputContainer: {
    marginBottom: 0,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 0,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  forgotPassword: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: -16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: Colors.gray,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});
