import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RealixColors, realixDestinations } from '@/src/constants/screens/realix';

const filterChips = ['Popular', 'Beach', 'Family', 'Luxury', 'Budget'] as const;

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Explore stays</Text>
            <Text style={styles.subtitle}>Discover curated homes across your favorite destinations.</Text>
          </View>
          <Pressable style={styles.searchButton}>
            <Ionicons name="options-outline" size={18} color={RealixColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={RealixColors.textMuted} />
          <Text style={styles.searchText}>Search by city, country, or property</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {filterChips.map((chip, index) => (
            <Pressable key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {realixDestinations.map((destination) => (
            <View key={destination.id} style={styles.card}>
              <View style={[styles.cardIconWrap, { backgroundColor: destination.color }]}>
                <Text style={styles.cardIcon}>{destination.emoji}</Text>
              </View>
              <Text style={styles.cardTitle}>{destination.label}</Text>
              <Text style={styles.cardBody}>Boutique villas, countryside homes, and seaside escapes.</Text>
            </View>
          ))}
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
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 22,
    color: RealixColors.textSecondary,
    maxWidth: 260,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchText: {
    fontSize: 14,
    color: RealixColors.textMuted,
  },
  chipRow: {
    gap: 10,
    paddingRight: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  chipActive: {
    backgroundColor: RealixColors.accent,
    borderColor: RealixColors.accent,
  },
  chipText: {
    color: RealixColors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    width: '47.8%',
    backgroundColor: RealixColors.screenBackground,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: RealixColors.border,
    padding: 16,
    gap: 10,
  },
  cardIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 20,
    color: RealixColors.textSecondary,
  },
});