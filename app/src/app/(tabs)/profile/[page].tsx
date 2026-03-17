import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import {
  RealixCard,
  RealixHeader,
  RealixScreen,
} from '@/src/components/realix/screen-shell';
import { RealixColors } from '@/src/constants/screens/realix';

const pageCopy: Record<string, { title: string; body: string; icon: keyof typeof Ionicons.glyphMap }> = {
  history: {
    title: 'History',
    body: 'Recent bookings, viewed listings, and saved destinations can be surfaced here once those APIs are connected.',
    icon: 'time-outline',
  },
  security: {
    title: 'Security Settings',
    body: 'Password updates, device sessions, and verification settings belong here. This screen is ready for backend wiring.',
    icon: 'shield-checkmark-outline',
  },
  'delete-account': {
    title: 'Delete Account',
    body: 'Account deletion requires a confirmed destructive flow. The UI placeholder is in place so the route structure is complete.',
    icon: 'trash-outline',
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    body: 'Legal copy can be loaded into this screen from your CMS or API without changing the navigation structure.',
    icon: 'document-text-outline',
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    body: 'Terms content can be connected here once the legal documents are finalized.',
    icon: 'document-outline',
  },
};

export default function ProfilePlaceholderPage() {
  const { page } = useLocalSearchParams<{ page: string }>();
  const content = pageCopy[page] ?? {
    title: 'Coming Soon',
    body: 'This route has been scaffolded for the new profile experience.',
    icon: 'ellipse-outline',
  };

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <RealixHeader title={content.title} showBack />

      <RealixCard style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name={content.icon} size={34} color={RealixColors.textPrimary} />
        </View>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.body}>{content.body}</Text>
      </RealixCard>
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  card: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.sectionBackground,
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: RealixColors.textPrimary,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: RealixColors.textSecondary,
    textAlign: 'center',
  },
});