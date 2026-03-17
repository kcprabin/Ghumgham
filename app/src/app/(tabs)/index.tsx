import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/context/AuthContext';
import { RealixColors, realixDestinations } from '@/src/constants/screens/realix';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const displayName = user?.name || user?.email?.split('@')[0] || 'Andrew Preston';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase())
    .join('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
          >
            <Text style={styles.avatarText}>{initials || 'AP'}</Text>
          </Pressable>

          <View style={styles.locationWrap}>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#e74c3c" />
              <Text style={styles.locationValue}>Jakarta, Indonesia</Text>
              <Ionicons name="chevron-down" size={14} color={RealixColors.textPrimary} />
            </View>
          </View>

          <Pressable
            onPress={() => router.push('/(tabs)/profile/notifications')}
            style={({ pressed }) => [styles.headerIconButton, pressed && styles.pressed]}
          >
            <Ionicons name="notifications-outline" size={20} color={RealixColors.textSecondary} />
          </Pressable>
        </View>

        <Pressable style={({ pressed }) => [styles.aiBar, pressed && styles.pressed]}>
          <Ionicons name="sparkles" size={16} color={RealixColors.orange} />
          <Text style={styles.aiText}>Try our new AI mode</Text>
        </Pressable>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Popular places</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destinationRow}>
            {realixDestinations.map((destination) => (
              <Pressable key={destination.id} style={styles.destinationItem}>
                <View style={[styles.destinationCircle, { backgroundColor: destination.color }]}>
                  <Text style={styles.destinationEmoji}>{destination.emoji}</Text>
                </View>
                <Text style={styles.destinationLabel}>{destination.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Featured property</Text>
            <Pressable onPress={() => router.push('/(tabs)/explore/detail')}>
              <Text style={styles.sectionLink}>See all</Text>
            </Pressable>
          </View>

          <Pressable style={({ pressed }) => [styles.propertyCard, pressed && styles.pressed]} onPress={() => router.push('/(tabs)/explore/detail')}>
            <View style={styles.propertyImage}>
              <View style={styles.sky} />
              <View style={styles.grass} />
              <View style={styles.houseRoof} />
              <View style={styles.houseBody}>
                <View style={styles.window} />
                <View style={styles.door} />
                <View style={styles.window} />
              </View>
              <Pressable style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={16} color={RealixColors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.propertyContent}>
              <Text style={styles.propertyTag}>House • Italy</Text>
              <Text style={styles.propertyName}>Mighty Cinco Family</Text>
              <Text style={styles.propertyDescription}>
                Adventure from the Amalfi Coast to Puglia on the ultimate coastal getaway.
              </Text>
              <Text style={styles.propertyPrice}>
                Start from <Text style={styles.propertyPriceStrong}>$1,435</Text> / night
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoTextWrap}>
            <Text style={styles.promoEyebrow}>Recommended</Text>
            <Text style={styles.promoTitle}>Stay somewhere memorable</Text>
            <Text style={styles.promoDescription}>
              Save homes you love, compare destinations, and keep trip updates in one place.
            </Text>
          </View>
          <Pressable style={styles.promoButton} onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.promoButtonText}>Explore now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RealixColors.pageBackground,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6d4cc2',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  locationWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  locationLabel: {
    fontSize: 11,
    color: RealixColors.textMuted,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: RealixColors.textPrimary,
  },
  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  aiBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.inputBorder,
  },
  aiText: {
    fontSize: 13,
    color: RealixColors.textSecondary,
    fontWeight: '500',
  },
  sectionBlock: {
    gap: 12,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: RealixColors.accentDark,
  },
  destinationRow: {
    gap: 14,
    paddingRight: 12,
  },
  destinationItem: {
    alignItems: 'center',
    gap: 6,
  },
  destinationCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1f1f1f',
  },
  destinationEmoji: {
    fontSize: 24,
  },
  destinationLabel: {
    fontSize: 12,
    color: RealixColors.textSecondary,
    fontWeight: '500',
  },
  propertyCard: {
    borderRadius: 24,
    backgroundColor: RealixColors.screenBackground,
    borderColor: RealixColors.border,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3,
  },
  propertyImage: {
    height: 180,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0d1a2e',
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1a2e',
  },
  grass: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundColor: '#172b0f',
  },
  houseRoof: {
    position: 'absolute',
    alignSelf: 'center',
    top: 34,
    width: 0,
    height: 0,
    borderLeftWidth: 90,
    borderRightWidth: 90,
    borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#181818',
  },
  houseBody: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    width: 200,
    height: 78,
    backgroundColor: '#222222',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  window: {
    width: 36,
    height: 26,
    borderRadius: 4,
    backgroundColor: '#1e3a5c',
  },
  door: {
    width: 30,
    height: 38,
    borderRadius: 4,
    backgroundColor: '#141414',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyContent: {
    padding: 18,
    gap: 6,
  },
  propertyTag: {
    fontSize: 12,
    color: RealixColors.textMuted,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  propertyDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: RealixColors.textSecondary,
  },
  propertyPrice: {
    fontSize: 14,
    color: RealixColors.textSecondary,
  },
  propertyPriceStrong: {
    fontSize: 20,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  promoCard: {
    borderRadius: 24,
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
    padding: 20,
    gap: 16,
  },
  promoTextWrap: {
    gap: 8,
  },
  promoEyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: RealixColors.textMuted,
    fontWeight: '700',
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  promoDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: RealixColors.textSecondary,
  },
  promoButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: RealixColors.accent,
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  pressed: {
    opacity: 0.78,
  },
});
