import React, { useEffect } from 'react';
import { RootTabScreenProps } from '../types';
import { View, Text } from 'react-native';

export default function Settings({
  navigation,
}: RootTabScreenProps<'TabOne'>) {

  return (
    <View>
      <Text>This is the settings</Text>
    </View>
  )

}