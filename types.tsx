/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Contacts: undefined;
  Login: undefined;
  Main: undefined;
  Auth: undefined;
  Bootstrap: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Contacts: undefined;
  Bootstrap: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ContactProps = {
  firstName: string,
  lastName: string,
  contactType: string,
  id: string,
  imageAvailable: boolean,
  lookupKey: string,
  name: string,
  key: string,
  image: any,
  toggleFriend: (id: string) => void;
  isFriend: boolean,
  isContactLoading: {
    id: string,
    loading: boolean
  }
}

export type FriendProps = {
  firstName: string;
  lastName: string;
  id: string;
  fullName: string;
  image: string | null; 
  isFriend: boolean,
  itemKey: string
}