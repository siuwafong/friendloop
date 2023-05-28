import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button } from 'react-native-paper';

interface AppButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  text: string;
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  text,
  loading,
}) => {
  return (
    <Button onPress={onPress} loading={loading ? loading : true}>
      {text}
    </Button>
  );
};
