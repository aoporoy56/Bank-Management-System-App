import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Get the current color scheme (light/dark mode)

  useEffect(() => {
    SplashScreen.hideAsync(); // Hide the splash screen after the app is ready
  }, []);

  // Set the theme based on the current color scheme
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        {/* Root navigation (tabs or main) */}
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
