import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '../components/Themed';
import { FriendContext } from '../context/FriendContext'
import Friend from '../components/friends/Friend'

export default function TabTwoScreen() {

  const { friends, setFriends } = useContext(FriendContext)

  console.log('friends', friends)

  const renderItem = ({ item }) => {
    return (
      <Friend
        fullName={item.fullName}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
