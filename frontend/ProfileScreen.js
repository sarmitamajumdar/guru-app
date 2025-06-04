import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [lang, setLang] = useState('');

  const handleSave = async () => {
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userLang', lang); // e.g., 'hi', 'bn', 'ta'
    navigation.navigate('Chat');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Language Code (hi, bn, ta, etc):</Text>
      <TextInput value={lang} onChangeText={setLang} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Continue to Chat" onPress={handleSave} />
    </View>
  );
}
