import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { AddEmailScreen } from '../screens/AddEmailScreen';
import { VerifyEmailScreen } from '../screens/VerifyEmailScreen';
import { CreatePasswordScreen } from '../screens/CreatePasswordScreen';
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
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
      initialRouteName="Splash"
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
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
