/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {
  Text,
  View,
  ColorSchemeName,
  Pressable,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Contacts from '../screens/Contacts';
import NotFoundScreen from '../screens/NotFoundScreen';
import Loops from '../screens/Loops';
import TabTwoScreen from '../screens/TabTwoScreen';
import Settings from '../screens/Settings'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Bootstrap from '../screens/Bootstrap';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Group> */}
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ gestureEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bootstrap"
        component={Bootstrap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={Loops}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Loops',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="circle-notch" color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate('Contacts')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome5
                  name="address-card"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={() => console.log('navigating to settings')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="gear"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-friends" color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate('Contacts')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome5
                  name="address-card"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Settings')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="gear"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
