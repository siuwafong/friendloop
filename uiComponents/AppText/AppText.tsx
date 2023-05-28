import React from 'react';
import { Text } from 'react-native-paper';

interface AppTextProps {
  children: string;
}

export const AppText: React.FC<AppTextProps> = ({ children }) => {
  return <Text>{children}</Text>;
};
