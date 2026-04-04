import React, { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import {
  RealixCard,
  RealixHeader,
  RealixScreen,
} from '@/src/components/realix/screen-shell';
import { RealixColors } from '@/src/constants/screens/realix';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? 'Andrew Preston');
  const [email, setEmail] = useState(user?.email ?? 'andrw.hello@gmail.com');
  const [bio, setBio] = useState('Traveling through beautiful stays and local experiences.');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const initials = useMemo(() => {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => item[0]?.toUpperCase())
      .join('');
  }, [name]);

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="dark" />
      <RealixHeader title="Settings" showBack />

      <RealixCard style={styles.card}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials || 'AP'}</Text>
            </View>
            <Pressable style={styles.avatarBadge}>
              <Ionicons name="create-outline" size={14} color="#ffffff" />
            </Pressable>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about your travel style"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
            />
            <Pressable style={styles.eyeButton} onPress={() => setShowPassword((current) => !current)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={RealixColors.textMuted}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
          onPress={() => Alert.alert('Saved', 'Your profile changes are stored locally in this UI flow.')}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </RealixCard>
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  card: {
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrap: {
    marginBottom: 10,
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RealixColors.accentToggle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: RealixColors.textMuted,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: RealixColors.textCaption,
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: RealixColors.inputBorder,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 15,
    color: RealixColors.textPrimary,
  },
  textArea: {
    minHeight: 96,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  saveButton: {
    marginTop: 6,
    minHeight: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.accent,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.8,
  },
});