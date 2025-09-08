/**
 * App Navigator
 * 
 * Main navigation component using React Navigation Stack Navigator
 * Defines the app's screen hierarchy and navigation flow
 * 
 * @example
 * ```tsx
 * <AppNavigator />
 * ```
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@app-types/navigation';
import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/HomeScreen';

/**
 * Stack navigator instance with typed parameters
 * 
 * Provides type safety for navigation parameters
 */
const Stack = createStackNavigator<RootStackParamList>();

/**
 * App Navigator Component
 * 
 * Renders the main navigation structure with splash and home screens
 * Configures navigation options and screen-specific settings
 * 
 * @returns JSX element with navigation container and stack navigator
 */
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
