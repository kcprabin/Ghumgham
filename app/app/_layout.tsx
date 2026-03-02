import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthNavigator } from '../navigation/AuthNavigator';

export default function RootLayout() {
  return (
    <>
      <AuthNavigator />
      <StatusBar style="auto" />
    </>
  );
}
