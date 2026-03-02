import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { AddEmailScreen } from '../screens/AddEmailScreen';
import { VerifyEmailScreen } from '../screens/VerifyEmailScreen';
import { CreatePasswordScreen } from '../screens/CreatePasswordScreen';
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  AddEmail: undefined;
  VerifyEmail: { email: string };
  CreatePassword: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name="AddEmail"
        component={AddEmailScreen}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
      />
      <Stack.Screen
        name="CreatePassword"
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
