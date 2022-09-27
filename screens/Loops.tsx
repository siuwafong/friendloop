import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView } from 'react-native';
// import { View } from '../components/Themed';
import 'react-native-get-random-values';

import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { FriendContext } from '../context/FriendContext'
import { RootTabScreenProps } from '../types';

export default function Loops({ navigation }: RootTabScreenProps<'TabOne'>) {
    
  const [appIsReady, setAppIsReady] = useState(false);
  const { friends, setFriends } = useContext(FriendContext)

    
    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}
            onLayout={onLayoutRootView}
        >
            <Text>
                This is where the loops go...
            </Text>
            <Entypo name="rocket" size={30} />
        </SafeAreaView>
    );
}
