import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import {
  RealixCard,
  RealixHeader,
  RealixListRow,
  RealixScreen,
  RealixSectionLabel,
} from '@/src/components/realix/screen-shell';
import { RealixColors } from '@/src/constants/screens/realix';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/signin' as never);
  };

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <RealixHeader title="Profile" />

      <RealixCard style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>KP</Text></View>
          <View style={styles.profileTextWrap}>
            <Text style={styles.profileName}>Kc Prabin</Text>
            <Text style={styles.profileEmail}>prabin@example.com</Text>
          </View>
        </View>
      </RealixCard>

      <RealixSectionLabel>General</RealixSectionLabel>
      <RealixCard>
        <RealixListRow
          label="Profile"
          leading={<Ionicons name="person-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/edit')}
        />
        <RealixListRow
          label="Language"
          leading={<Ionicons name="language-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/language')}
        />
        <RealixListRow
          label="Notifications"
          leading={<Ionicons name="mail-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/notifications')}
        />
        <RealixListRow
          label="Notification Settings"
          leading={<Ionicons name="notifications-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/notification-settings')}
        />
        <RealixListRow
          label="History"
          leading={<Ionicons name="time-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/history')}
        />
        <RealixListRow
          label="Reviews"
          leading={<Ionicons name="star-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/review')}
        />
        <RealixListRow
          label="Location"
          leading={<Ionicons name="location-outline" size={18} color={RealixColors.textSecondary} />}
          trailing={
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#3a3a3a', true: RealixColors.accentToggle }}
              thumbColor="#ffffff"
            />
          }
        />
      </RealixCard>

      <RealixSectionLabel>Account and security</RealixSectionLabel>
      <RealixCard>
        <RealixListRow
          label="Security Settings"
          leading={<Ionicons name="shield-checkmark-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/security')}
        />
        <RealixListRow
          label="Delete Account"
          leading={<Ionicons name="trash-outline" size={18} color={RealixColors.danger} />}
          destructive
          onPress={() => router.push('/(tabs)/profile/delete-account')}
        />
      </RealixCard>

      <RealixSectionLabel>Other</RealixSectionLabel>
      <RealixCard>
        <RealixListRow
          label="FAQ"
          leading={<Ionicons name="help-circle-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/faq')}
        />
        <RealixListRow
          label="Privacy Policy"
          leading={<Ionicons name="document-text-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/privacy-policy')}
        />
        <RealixListRow
          label="Terms and Conditions"
          leading={<Ionicons name="document-outline" size={18} color={RealixColors.textSecondary} />}
          onPress={() => router.push('/(tabs)/profile/terms-and-conditions')}
        />
      </RealixCard>

      <Text style={styles.meta}>These screens use local sample data so backend endpoints can be connected later without changing the route flow.</Text>

      <RealixCard>
        <RealixListRow
          label="Log out"
          leading={<Ionicons name="log-out-outline" size={18} color={RealixColors.danger} />}
          destructive
          trailing={<Ionicons name="chevron-forward" size={18} color={RealixColors.textCaption} />}
          onPress={() => {
            Alert.alert('Log out', 'Do you want to end your session?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log out', style: 'destructive', onPress: () => void handleLogout() },
            ]);
          }}
        />
      </RealixCard>
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  profileCard: {
    padding: 18,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: RealixColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  profileTextWrap: {
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  profileEmail: {
    fontSize: 13,
    color: RealixColors.textMuted,
  },
  meta: {
    fontSize: 12,
    lineHeight: 18,
    color: RealixColors.textMuted,
    paddingHorizontal: 4,
  },
});