import React, { useState, useContext, memo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { IContact } from './Contacts'
import {  Avatar } from 'react-native-paper';

export const Contact: React.FC<IContact> = ({ fullName, image }) => {

    const styles = StyleSheet.create({
        toggleContactBtn: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            paddingTop: 20
        }
    })

    return (
        <View style={styles.toggleContactBtn}>
            <Text>{fullName}</Text>
            {/* <Button mode="outlined" onPress={() => console.log('pressed')}>Add Contact</Button> */}
            {image ? <Avatar.Image size={24} source={{ uri: image }} /> : null}
        </View>
    )
}