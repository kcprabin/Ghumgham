import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  RealixCard,
  RealixHeader,
  RealixScreen,
  RealixSectionLabel,
} from '@/src/components/realix/screen-shell';
import { RealixColors, realixNotificationFeed } from '@/src/constants/screens/realix';

export default function NotificationsScreen() {
  const groups = Array.from(new Set(realixNotificationFeed.map((item) => item.group)));

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="dark" />
      <RealixHeader title="Notifications" />

      {groups.map((group) => (
        <View key={group} style={styles.groupWrap}>
          <RealixSectionLabel>{group}</RealixSectionLabel>
          <RealixCard>
            {realixNotificationFeed
              .filter((item) => item.group === group)
              .map((item, index, items) => (
                <View
                  key={item.id}
                  style={[styles.row, index === items.length - 1 && styles.rowLast]}
                >
                  <View style={styles.iconCircle}>
                    <Ionicons name="checkmark" size={18} color="#ffffff" />
                  </View>
                  <View style={styles.body}>
                    <Text style={styles.time}>{item.timestamp}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                </View>
              ))}
          </RealixCard>
        </View>
      ))}
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  groupWrap: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: RealixColors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: RealixColors.accentToggle,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  time: {
    fontSize: 11,
    color: RealixColors.textCaption,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  message: {
    fontSize: 13,
    lineHeight: 20,
    color: RealixColors.textSecondary,
  },
});