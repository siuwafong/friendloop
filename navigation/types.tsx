import {
  NavigatorScreenParams,
  CompositeScreenProps,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootTabParamList = {
  Schedule: undefined;
  FamilyAndFriends: undefined;
  Contacts: undefined;
};

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  Schedule: undefined;
  FamilyAndFriends: undefined;
  Contacts: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<AppStackParamList> | undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Bootstrap: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;
