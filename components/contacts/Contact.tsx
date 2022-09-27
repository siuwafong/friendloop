import React, { useState, useContext, memo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ContactProps } from '../../types';
import { Button, ActivityIndicator, Colors, Checkbox } from 'react-native-paper';
import { FriendContext } from '../../context/FriendContext';
import { v4 as uuidv4 } from 'uuid';


const propsAreEqual = (prevprops, nextProps) => {
  return JSON.stringify(prevprops) === JSON.stringify(nextProps)
}

const Contact = ({
  firstName,
  lastName,
  fullName,
  name,
  image,
  isFriend,
  id,
  // toggleFriend,
  itemKey,
  addToFriends
}: ContactProps) => {

  const [currentFriend, setCurrentFriend] = useState<boolean>(isFriend)
  const { setFriends, friends } = useContext(FriendContext)
  const [checked, setChecked] = useState<boolean>(isFriend)

  const toggleFriend = async (id: string) => {
    setCurrentFriend(!currentFriend)
  }

  const handleCheckboxPress = (id: string) => {
    setChecked(!checked)
    addToFriends({
          firstName,
        lastName,
        fullName,
        image,
        isFriend: !currentFriend,
        id,
        key: uuidv4()
    })
  }

  return (
    <View style={styles.contactView}>
      {image ? (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/images/profile-placeholder.png')}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name.length > 20 ? name.substring(0, 20) + '...' : name}
        </Text>
      </View>
      {
        !currentFriend ? (
          <Button
            mode="contained"
            onPress={() => toggleFriend(id)
              // toggleFriend(
              //   {
              //     firstName,
              //     lastName,
              //     fullName,
              //     image,
              //     isFriend: true,
              //     id,
              //     itemKey,
              //   },
              //   'add'
              // )
            }
            style={styles.addButton}
            dark={true}
            icon="account-plus"
          >
            Loop
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => toggleFriend(id)
            //   toggleFriend(
            //     {
            //       firstName,
            //       lastName,
            //       fullName,
            //       image,
            //       isFriend: false,
            //       id,
            //       itemKey,
            //     },
            //     'remove'
            //   )
            }
            style={styles.addButton}
            dark={true}
            icon="account-minus"
          >
            Remove
          </Button>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  contactView: {
    // borderWidth: 1,
    // borderColor: '#000000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  name: {
    // color: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    margin: 10,
  },
  textContainer: {
    width: '50%',
  },
  addButton: {
    // marginRight: 10
  },
});

export default React.memo(Contact, propsAreEqual);
