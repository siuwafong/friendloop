import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { AuthContextProvider } from './screens/Welcome/hooks/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <AuthContextProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </AuthContextProvider>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
