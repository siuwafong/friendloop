import * as React from 'react';
import { TextInput } from 'react-native-paper';

interface AppInputProps {
  label?: string;
  value: string;
  onChangeText: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  return <TextInput label={label} value={value} onChangeText={onChangeText} />;
};
