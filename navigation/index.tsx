import React from "react";
import { ColorSchemeName, Pressable, View, StyleSheet } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  RootStackParamList,
  AuthStackParamList,
  AppStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Bootstrap } from "../screens/Bootstrap/Bootstrap";
import { NotFound } from "../screens/NotFound/NotFound";
import { ContactsScreen as Contacts } from "../screens/Contacts/Contacts";
import { Settings } from "../screens/Settings/Settings";
import { Login } from "../screens/Welcome/Login";
import { Signup } from "../screens/Welcome/Signup";
import { FamilyAndFriends } from "../screens/FamilyAndFriends/FamilyAndFriends";
import { Schedule } from "../screens/Schedule/Schedule";

interface NavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: React.FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Root"
      screenOptions={{ animation: "none" }}
    >
      <AppStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Oops!" }}
      />
      <AppStack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: "Contacts" }}
      />

      <AppStack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </AppStack.Navigator>
  );
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ gestureEnabled: false, animation: "none" }}
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ gestureEnabled: false, headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Schedule"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation }: RootTabScreenProps<"Schedule">) => ({
          title: "Loops",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="circle-notch" color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate("Contacts")}
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
                onPress={() => console.log("navigating to settings")}
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
        name="FamilyAndFriends"
        component={FamilyAndFriends}
        options={({ navigation }: RootTabScreenProps<"Schedule">) => ({
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-friends" color={color} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate("Contacts")}
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
                onPress={() => navigation.navigate("Settings")}
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
};

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) => {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
};

const styles = StyleSheet.create({
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{ animation: "none" }}
    >
      <RootStack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Main"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Bootstrap"
        component={Bootstrap}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default Navigation;
