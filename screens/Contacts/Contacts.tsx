import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from './Contact'
import { ActivityIndicator } from 'react-native-paper';

export interface IContact {
    name?: string;
    lastName: string | null;
    firstName: string | null;
    id: string;
    imageAvailable: boolean;
    contactType: string;
    key: string;
    image: any;
    fullName: string;
    // isFriend: boolean;
  }

export const ContactsScreen: React.FC = () => {

    const [contacts, setContacts] = useState<IContact[] | []>([]);
    const [allContacts, setAllContacts] = useState<IContact[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageOffset, setPageOffset] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)

    const getContacts = async () => {
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
              const { data } = await Contacts.getContactsAsync({
                fields: [
                  Contacts.Fields.Emails,
                  Contacts.Fields.PhoneNumbers,
                  Contacts.Fields.Image,
                ],
                pageOffset,
                pageSize: 100,
                sort: Contacts.Fields.Name
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
                  });
                });
    
                contactsData.sort((a, b) => a.name.localeCompare(b.name));

                console.log({ contactsData })
                
                setContacts(contactsData);
                setAllContacts(contactsData);
                setIsLoading(false);
              }
            } else {
                // TODO: show popup modal telling the user that they cannot add loops until they allow permissions. Then redirect the user back to the home screen
            }
          } catch (err) {
            console.error(err);
          }
    }

    useEffect(() => {
        getContacts()
    }, [])

    const renderItem = ({ item }) => {
  
        return (
          <Contact
            firstName={item.firstName}
            lastName={item.lastName}
            fullName={item.fullName}
            id={item.id}
            imageAvailable={item.imageAvailable}
            contactType={item.contactType}
            key={item.key}
            image={item.image}
          />
        )
      }


    return (
        <View>
            {isLoading ?
            <ActivityIndicator size="large" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
            :
            <FlatList
              data={contacts}
              renderItem={renderItem}
              keyExtractor={(contact) => contact.id}
            />
            }
        </View>
    )
}