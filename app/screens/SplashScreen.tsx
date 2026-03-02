import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Colors } from '../constants/colors';

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Ghumgham</Text>
      </View>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
  },
  loader: {
    marginTop: 30,
  },
});
