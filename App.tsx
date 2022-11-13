import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FriendContextProvider } from './context/FriendContext'
import { AuthContextProvider } from './context/AuthContext'
import * as firebase  from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {initializeAuth} from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appInitialization, setAppInitialization] = useState(false)
  // TextInput.defaultProps.selectionColor = 'white'

  const firebaseConfig = {
    apiKey: "AIzaSyDR_X-dy0RsPJUbAuvKp_l2oXey73ZTSF4",
    authDomain: "friendloop-a265e.firebaseapp.com",
    projectId: "friendloop-a265e",
    storageBucket: "friendloop-a265e.appspot.com",
    messagingSenderId: "511325730281",
    appId: "1:511325730281:web:e7f617e8d508f265c7c778",
    measurementId: "G-XSHWQKLPQP"
  };

  if (appInitialization === false) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    // const auth = initializeAuth(firebaseApp, {
    //   persistence: getReactNativePersistence(AsyncStorage)
    // })
    setAppInitialization(true)
  }



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <FriendContextProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </FriendContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}
