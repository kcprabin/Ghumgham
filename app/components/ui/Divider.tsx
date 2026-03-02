import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface DividerProps {
  text?: string;
  containerStyle?: ViewStyle;
  isDark?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ text = 'or', containerStyle, isDark = false }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.line, isDark && styles.lineDark]} />
      <Text style={[styles.text, isDark && styles.textDark]}>{text}</Text>
      <View style={[styles.line, isDark && styles.lineDark]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderGray,
  },
  lineDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    marginHorizontal: 12,
    color: Colors.textGray,
    fontSize: 14,
    fontWeight: '500',
  },
  textDark: {
    color: Colors.white,
  },
});
