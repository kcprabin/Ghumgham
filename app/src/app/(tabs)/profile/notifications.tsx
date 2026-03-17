import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RealixCard, RealixHeader, RealixScreen, RealixSectionLabel } from '@/src/components/realix/screen-shell';
import { RealixColors, realixEmptyNotificationsCopy, realixNotificationFeed } from '@/src/constants/screens/realix';

export default function ProfileNotificationsScreen() {
  const [showEmpty, setShowEmpty] = useState(false);
  const groups = Array.from(new Set(realixNotificationFeed.map((item) => item.group)));

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <RealixHeader
        title="Notifications"
        showBack
        rightSlot={
          <Pressable onPress={() => setShowEmpty((current) => !current)}>
            <Text style={styles.toggleText}>{showEmpty ? 'List' : 'Empty'}</Text>
          </Pressable>
        }
      />

      {showEmpty ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}><Ionicons name="notifications-off-outline" size={28} color={RealixColors.textMuted} /></View>
          <Text style={styles.emptyTitle}>{realixEmptyNotificationsCopy.title}</Text>
          <Text style={styles.emptyBody}>{realixEmptyNotificationsCopy.body}</Text>
        </View>
      ) : (
        groups.map((group) => (
          <View key={group} style={styles.groupWrap}>
            <RealixSectionLabel>{group}</RealixSectionLabel>
            <RealixCard>
              {realixNotificationFeed
                .filter((item) => item.group === group)
                .map((item, index, items) => (
                  <View key={item.id} style={[styles.row, index === items.length - 1 && styles.rowLast]}>
                    <View style={styles.iconCircle}><Ionicons name="checkmark" size={16} color="#000000" /></View>
                    <View style={styles.bodyWrap}>
                      <Text style={styles.time}>{item.timestamp}</Text>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.message}>{item.message}</Text>
                    </View>
                  </View>
                ))}
            </RealixCard>
          </View>
        ))
      )}
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 0 },
  toggleText: { fontSize: 12, fontWeight: '700', color: RealixColors.accent },
  groupWrap: { gap: 10 },
  row: { flexDirection: 'row', gap: 14, paddingHorizontal: 18, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: RealixColors.border },
  rowLast: { borderBottomWidth: 0 },
  iconCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: RealixColors.accent, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  bodyWrap: { flex: 1, gap: 4 },
  time: { fontSize: 11, color: RealixColors.textMuted },
  title: { fontSize: 15, fontWeight: '700', color: RealixColors.textPrimary },
  message: { fontSize: 13, lineHeight: 20, color: RealixColors.textSecondary },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: RealixColors.cardBackground, borderWidth: 1, borderColor: RealixColors.border, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: RealixColors.textPrimary, textAlign: 'center' },
  emptyBody: { maxWidth: 260, fontSize: 13, lineHeight: 20, color: RealixColors.textMuted, textAlign: 'center' },
});