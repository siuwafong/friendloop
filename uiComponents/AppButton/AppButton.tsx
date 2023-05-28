import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from 'react-native-paper';

interface AppButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  text: string;
}

export const AppButton: React.FC<AppButtonProps> = ({ onPress, text }) => {
  return <Button onPress={onPress}>{text}</Button>;
};
