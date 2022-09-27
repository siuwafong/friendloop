import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FriendProps } from '../../types';


const Friend = ({
  firstName,
  lastName,
  id,
  fullName,
  image,
  isFriend,
  itemKey
}: FriendProps) => {


  return (
    <View>
      <Text>{fullName} is my friend!</Text>
    </View>
  )
}

export default Friend