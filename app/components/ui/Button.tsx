import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.secondaryButton, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.secondaryButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  onPress,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress} activeOpacity={0.8}>
      {icon && <>{icon}</>}
      <Text style={styles.socialButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12,
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: Colors.darkGray,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 8,
  },
  secondaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  socialButton: {
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  socialButtonText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
});
