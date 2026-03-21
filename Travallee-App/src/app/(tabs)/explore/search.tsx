import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RealixColors, realixSearchResults } from '@/src/constants/screens/realix';

export default function ExploreSearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.headerRow}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <Pressable style={styles.searchBar}>
        <Ionicons name="search" size={16} color={RealixColors.textMuted} />
        <Text style={styles.searchText}>Searching...</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {realixSearchResults.map((result) => (
          <Pressable key={result.id} style={styles.row} onPress={() => router.push('/(tabs)/explore/detail')}>
            <View style={styles.thumb}><Text style={styles.thumbEmoji}>{result.emoji}</Text></View>
            <View style={styles.textWrap}>
              <Text style={styles.name}>{result.name}</Text>
              <Text style={styles.address}>{result.address}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.keyboard}>
        {['QWERTYUIOP', 'ASDFGHJKL', '⇧ZXCVBNM⌫'].map((row, index) => (
          <View key={index} style={styles.keyboardRow}>
            {row.split('').map((key, keyIndex) => (
              <View key={`${key}-${keyIndex}`} style={[styles.key, (key === '⇧' || key === '⌫') && styles.keyWide]}>
                <Text style={styles.keyText}>{key}</Text>
              </View>
            ))}
          </View>
        ))}
        <View style={styles.keyboardRow}>
          <View style={[styles.key, styles.keyWide]}><Text style={styles.keyText}>123</Text></View>
          <View style={[styles.key, styles.keySpace]}><Text style={styles.keyText}>space</Text></View>
          <View style={[styles.key, styles.keyAction]}><Text style={styles.keyActionText}>return</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: RealixColors.screenBackground },
  headerRow: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 6 },
  title: { fontSize: 24, fontWeight: '700', color: RealixColors.textPrimary },
  searchBar: {
    marginHorizontal: 20,
    backgroundColor: RealixColors.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: RealixColors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchText: { fontSize: 13, color: RealixColors.textMuted },
  content: { paddingVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingVertical: 10 },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 20 },
  textWrap: { flex: 1 },
  name: { fontSize: 13, fontWeight: '600', color: RealixColors.textPrimary },
  address: { fontSize: 11, color: RealixColors.textMuted, marginTop: 2 },
  keyboard: { backgroundColor: '#1a1a1a', paddingHorizontal: 8, paddingTop: 8, paddingBottom: 10 },
  keyboardRow: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 4 },
  key: {
    width: 22,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWide: { width: 30 },
  keySpace: { width: 100 },
  keyAction: { width: 48, backgroundColor: RealixColors.accent },
  keyText: { fontSize: 10, color: RealixColors.textPrimary, fontWeight: '500' },
  keyActionText: { fontSize: 10, color: '#000000', fontWeight: '700' },
});