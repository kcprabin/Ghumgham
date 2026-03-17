import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RealixColors } from '@/src/constants/screens/realix';

export default function ExploreSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.iconWrap}><Ionicons name="checkmark" size={32} color="#000000" /></View>
        <Text style={styles.title}>Payment successful</Text>
        <Text style={styles.body}>Your dummy booking flow is complete. Backend actions can plug into this screen later.</Text>
        <Pressable style={styles.button} onPress={() => router.replace('/(tabs)/index')}><Text style={styles.buttonText}>Go To Home</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: RealixColors.screenBackground },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, gap: 12 },
  iconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: RealixColors.accent, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: RealixColors.textPrimary, textAlign: 'center' },
  body: { fontSize: 13, lineHeight: 20, color: RealixColors.textMuted, textAlign: 'center' },
  button: { marginTop: 8, minHeight: 42, borderRadius: 22, backgroundColor: RealixColors.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  buttonText: { color: '#000000', fontWeight: '700' },
});