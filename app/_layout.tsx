import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/utils/authContext';
import { useAuth } from '@/utils/authContext';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
       <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
          <Slot />
          </AuthProvider>
        </QueryClientProvider>
       </BottomSheetModalProvider>
      </GestureHandlerRootView>

    </ThemeProvider>
  );
}
