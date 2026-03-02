import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to GhumGham!</Text>
        <Text style={styles.subtitle}>You have successfully created your account.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Created Successfully</Text>
          <Text style={styles.cardText}>
            Your email has been verified and your password has been set.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textGray,
    fontWeight: '500',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textGray,
    fontWeight: '500',
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
