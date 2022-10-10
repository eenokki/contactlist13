import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Button, FlatList, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
        console.log(data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={contact}
        renderItem={({ item }) =>
          <View style={styles.text}>
            <Text>{item.name}, {item.phoneNumbers ? item.phoneNumbers[0].number : "number not found"} </Text>
          </View>}
      />

      <Button title="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    marginTop: 5
  },
  flatlist: {
    marginTop: 30
  }
});
