import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 5,
  onComplete,
  value = '',
  containerStyle,
}) => {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    // Only allow numbers
    if (!/^\d*$/.test(text)) {
      return;
    }

    const newValue = value.split('');
    newValue[index] = text;
    const newOTP = newValue.join('');

    // Move to next input if digit is entered
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Call onComplete if all fields are filled
    if (newOTP.length === length && onComplete) {
      onComplete(newOTP);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newValue = value.split('');
      newValue[index] = '';
      const newOTP = newValue.join('');

      // Move to previous input on backspace
      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[
            styles.otpBox,
            value[index] && styles.otpBoxFilled,
          ]}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={value[index] || ''}
          editable={true}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.lightGray,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
});
