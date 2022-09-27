import React, { useEffect, useState, createRef, useContext } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { RootTabScreenProps } from '../types';
import Contact from '../components/contacts/Contact';
import DelayInput from 'react-native-debounce-input';
import { FriendContext } from '../context/FriendContext'
import { getFirestore, doc, collection, getDoc, getDocs } from 'firebase/firestore';

interface IContact {
  name: string;
  lastName: string | null;
  firstName: string | null;
  id: string;
  imageAvailable: boolean;
  contactType: string;
  key: string;
  image: any;
  fullName: string;
  isFriend: boolean;
}

interface IFriend {
  firstName: string;
  lastName: string;
  id: string;
  fullName: string;
  image: string | null; 
  isFriend: boolean,
  itemKey: string
}



export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {

  const [contacts, setContacts] = useState<IContact[] | []>([]);
  const [allContacts, setAllContacts] = useState<IContact[] | []>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [searchTerm, setSearchTerm] = useState<String>('');
  const [contactsToAdd, setContactsToAdd] = useState<IContact[] | []>([]);

  const inputRef = createRef();




  // const users = Firestore.collection(firestore, "users")

  const { friends } = useContext(FriendContext)

  useEffect(() => {
    console.log('running Contacts useEffect')
    let friendIds
    if (friends.length) {
      friendIds = friends.map(friend => friend.id)
    } else {
      friendIds = []
    }

    (async () => {

      try {
        const firestore = getFirestore()
        const usersRef = await collection(firestore, "users")
        const users = await getDocs(usersRef)
        users.forEach(user => console.log(user.data()))
      } catch (error) {
        console.error(error)
      }


      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Emails,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Image,
            ],
          });

          if (data.length > 0) {
            const contactsData: IContact[] = [];
            data.forEach((person) => {
              contactsData.push({
                name: person.name,
                firstName: person.firstName,
                lastName: person.lastName,
                id: person.id,
                imageAvailable: person.imageAvailable,
                contactType: person.contactType,
                key: uuidv4(),
                image: person.imageAvailable ? person.image.uri : '',
                fullName: `${person.firstName} ${person.lastName}`,
                isFriend: friendIds.includes(person.id)
              });
            });

            contactsData.sort((a, b) => a.name.localeCompare(b.name));
            
            setContacts(contactsData);
            setAllContacts(contactsData);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToFriends = (contact: IContact) => {
    setContactsToAdd([...contactsToAdd, contact])
  } 

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredContacts = contacts.filter(
      (contact) => contact.fullName && contact.fullName.includes(value)
    );
    console.log(filteredContacts);
    if (value) {
      setContacts(filteredContacts);
    } else {
      setContacts(allContacts);
    }
  };

  // const toggleFriend = (friendObj: IFriend, type: string) => {
  //   if (type === 'add') {
  //     console.log('adding to friends:', friendObj)
  //     setFriends([...friends, friendObj])
  //     // TODO - try replacing map with just replacing the selected item
  //     setContacts(contacts.map(contact => contact.key === friendObj.itemKey ? { ...contact, isFriend: true } : contact))
  //   } else if (type === 'remove') {
  //     console.log('removing from friends:', friendObj)
  //     setFriends(friends.filter(friend => friend.id !== friendObj.id))
  //     setContacts(contacts.map(contact => contact.key === friendObj.itemKey ? { ...contact, isFriend: false} : contact))
  //   }
  // }

  const renderItem = ({ item, index }) => {
  
    return (
      <Contact
        name={item.name}
        firstName={item.firstName}
        lastName={item.lastName}
        fullName={item.fullName}
        id={item.id}
        imageAvailable={item.imageAvailable}
        lookupKey={item.lookupKey}
        contactType={item.contactType}
        itemKey={item.key}
        image={item.image}
        isFriend={item.isFriend}
        // toggleFriend={toggleFriend}
        addToFriends={addToFriends}
      />
    )
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size="large"
        />
      ) : (
        <View>
          <DelayInput
            value={searchTerm}
            minLength={2}
            inputRef={inputRef}
            onChangeText={(e) => handleSearch(e)}
            delayTimeout={500}
            style={{
              margin: 10,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          />
            <FlatList
              data={contacts}
              renderItem={renderItem}
              keyExtractor={(contact) => contact.id}
            />
        </View>
      )}
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
