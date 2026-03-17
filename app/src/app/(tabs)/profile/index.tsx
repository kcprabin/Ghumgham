import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Switch, Text } from 'react-native';
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
      <StatusBar style="dark" />
      <RealixHeader title="Profile" />

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
          label="Location"
          leading={<Ionicons name="location-outline" size={18} color={RealixColors.textSecondary} />}
          trailing={
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#d6d6d6', true: RealixColors.accentToggle }}
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

      <Text style={styles.meta}>Profile UI is wired to the current app shell. Data entry remains local until those APIs are connected.</Text>

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
  meta: {
    fontSize: 12,
    lineHeight: 18,
    color: RealixColors.textMuted,
    paddingHorizontal: 4,
  },
});