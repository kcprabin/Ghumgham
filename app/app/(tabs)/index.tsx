
import { Platform, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';


export default function HomeScreen() {
  return (
    <ThemedText>Home Screen</ThemedText>
 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
