import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RealixColors,
  realixAmenityList,
  realixDiscoverProperty,
  realixGallery,
  realixRatingBars,
} from '@/src/constants/screens/realix';

export default function DiscoverDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color={RealixColors.textPrimary} />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}><Ionicons name="heart-outline" size={16} color={RealixColors.textSecondary} /></Pressable>
          <Pressable style={styles.headerIcon}><Ionicons name="ellipsis-horizontal" size={16} color={RealixColors.textSecondary} /></Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroImage}>
          <View style={styles.heroSky} />
          <View style={styles.heroGrass} />
          <View style={styles.heroRoof} />
          <View style={styles.heroBody}>
            <View style={styles.heroWindow} />
            <View style={styles.heroDoor} />
            <View style={styles.heroWindow} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.name}>{realixDiscoverProperty.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={12} color={RealixColors.textMuted} />
            <Text style={styles.locationText}>{realixDiscoverProperty.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{realixDiscoverProperty.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Amenities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.amenityRow}>
            {realixAmenityList.map((amenity) => (
              <View key={amenity.id} style={styles.amenityItem}>
                <View style={styles.amenityIconBox}>
                  <Ionicons name={amenity.icon as any} size={16} color={RealixColors.textSecondary} />
                </View>
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </ScrollView>
          <Pressable style={styles.allAmenitiesButton}>
            <Text style={styles.allAmenitiesText}>All Amenities</Text>
            <Ionicons name="arrow-forward" size={13} color={RealixColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <View style={styles.galleryRow}>
            {realixGallery.map((item, index) => (
              <View key={item.id} style={[styles.galleryItem, { backgroundColor: item.tone }]}>
                <Text style={styles.galleryText}>{item.title}</Text>
                {index === 2 ? (
                  <View style={styles.galleryOverlay}>
                    <Text style={styles.galleryOverlayText}>+12</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapCard}>
            <View style={styles.mapGrid} />
            <View style={styles.mapPinOuter}>
              <View style={styles.mapPinInner} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.ratingHeader}>
            <View style={styles.ratingLeft}>
              <Text style={styles.ratingScore}>{realixDiscoverProperty.reviewScore}</Text>
              <View>
                <View style={styles.starRow}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Ionicons key={idx} name="star" size={12} color="#F5A623" />
                  ))}
                </View>
                <Text style={styles.ratingCount}>{realixDiscoverProperty.reviewCount} ratings</Text>
              </View>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/profile/review')}>
              <Text style={styles.viewAll}>View all Reviews</Text>
            </Pressable>
          </View>

          <View style={styles.barsWrap}>
            {realixRatingBars.map((item) => (
              <View key={item.stars} style={styles.barRow}>
                <Text style={styles.barLabel}>{item.stars}</Text>
                <Ionicons name="star" size={10} color="#F5A623" />
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${item.percent}%` }]} />
                </View>
                <Text style={styles.barPercent}>{item.percent}%</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Price:</Text>
          <Text style={styles.bottomPrice}>${realixDiscoverProperty.nightlyPrice}<Text style={styles.bottomUnit}>/night</Text></Text>
        </View>
        <View style={styles.bottomActions}>
          <Pressable style={styles.circleButton}>
            <Ionicons name="heart-outline" size={16} color={RealixColors.textSecondary} />
          </Pressable>
          <Pressable style={styles.bookButton} onPress={() => router.push('/(tabs)/explore/select-date')}>
            <Text style={styles.bookText}>Book</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: RealixColors.pageBackground },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerRight: { flexDirection: 'row', gap: 8 },
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: RealixColors.border,
    backgroundColor: RealixColors.screenBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { paddingHorizontal: 20, paddingBottom: 20, gap: 14 },
  heroImage: { height: 190, borderRadius: 16, overflow: 'hidden' },
  heroSky: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0d1a2e' },
  heroGrass: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 62, backgroundColor: '#16280f' },
  heroRoof: {
    position: 'absolute',
    alignSelf: 'center',
    top: 34,
    width: 0,
    height: 0,
    borderLeftWidth: 86,
    borderRightWidth: 86,
    borderBottomWidth: 56,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#111111',
  },
  heroBody: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: 188,
    height: 66,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  heroWindow: { width: 32, height: 22, borderRadius: 3, backgroundColor: '#1e3a5c' },
  heroDoor: { width: 20, height: 34, borderRadius: 2, backgroundColor: '#111111' },
  section: {
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: RealixColors.border,
    padding: 12,
    gap: 8,
  },
  name: { fontSize: 18, fontWeight: '700', color: RealixColors.textPrimary },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { flex: 1, fontSize: 12, color: RealixColors.textMuted },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: RealixColors.textPrimary },
  about: { fontSize: 12, lineHeight: 20, color: RealixColors.textSecondary },
  amenityRow: { gap: 10, paddingRight: 10 },
  amenityItem: { alignItems: 'center', gap: 4 },
  amenityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: RealixColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityLabel: { fontSize: 10, color: RealixColors.textSecondary },
  allAmenitiesButton: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  allAmenitiesText: { fontSize: 12, fontWeight: '600', color: RealixColors.textPrimary },
  galleryRow: { flexDirection: 'row', gap: 8 },
  galleryItem: {
    width: 80,
    height: 62,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  galleryText: { fontSize: 10, color: RealixColors.textSecondary, fontWeight: '600' },
  galleryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryOverlayText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  mapCard: {
    height: 82,
    borderRadius: 10,
    backgroundColor: '#1a1a1e',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 0,
    borderColor: '#d8e0e4',
  },
  mapPinOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: RealixColors.accent },
  ratingHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ratingLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingScore: { fontSize: 22, fontWeight: '700', color: RealixColors.textPrimary },
  starRow: { flexDirection: 'row', gap: 1 },
  ratingCount: { fontSize: 11, color: RealixColors.textMuted },
  viewAll: { fontSize: 11, fontWeight: '600', color: RealixColors.accentDark },
  barsWrap: { gap: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  barLabel: { width: 8, fontSize: 11, color: RealixColors.textMuted },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2a2a2a',
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3, backgroundColor: '#F5A623' },
  barPercent: { width: 30, fontSize: 10, color: RealixColors.textMuted, textAlign: 'right' },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: RealixColors.border,
    backgroundColor: RealixColors.screenBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLabel: { fontSize: 11, color: RealixColors.textMuted },
  bottomPrice: { fontSize: 18, fontWeight: '700', color: RealixColors.textPrimary },
  bottomUnit: { fontSize: 12, color: RealixColors.textMuted, fontWeight: '400' },
  bottomActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: RealixColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    borderRadius: 20,
    backgroundColor: RealixColors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookText: { color: '#000000', fontWeight: '700', fontSize: 13 },
});