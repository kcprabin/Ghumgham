import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface PasswordStrengthProps {
  password: string;
  containerStyle?: ViewStyle;
}

interface StrengthItem {
  label: string;
  isValid: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, containerStyle }) => {
  const strengthItems: StrengthItem[] = [
    {
      label: '8 characters minimum',
      isValid: password.length >= 8,
    },
    {
      label: 'a number',
      isValid: /\d/.test(password),
    },
    {
      label: 'a symbol',
      isValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {strengthItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Ionicons
            name={item.isValid ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color={item.isValid ? Colors.success : Colors.darkGray}
            style={styles.icon}
          />
          <Text style={[styles.label, item.isValid && styles.validLabel]}>
            ✓ {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textGray,
  },
  validLabel: {
    color: Colors.success,
    fontWeight: '600',
  },
});
