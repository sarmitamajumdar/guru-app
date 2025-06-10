import { GOOGLE_TRANSLATE_API_KEY, BACKEND_URL } from '@env';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("✅ GOOGLE_TRANSLATE_API_KEY:", GOOGLE_TRANSLATE_API_KEY);
    console.log("✅ BACKEND_URL:", BACKEND_URL);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
