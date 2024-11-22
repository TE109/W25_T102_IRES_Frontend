import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import CheckInScreen from './screens/CheckInScreen'; // First screen
import VisitorInScreen from './screens/VisitorInScreen'; // Second screen
import ConfirmationScreen from './screens/ConfirmationScreen'; // Last screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CheckIn"
        screenOptions={{
          headerShown: false, // Hide default headers for a cleaner UI
        }}
      >
        <Stack.Screen name="CheckIn" component={CheckInScreen} />
        <Stack.Screen name="VisitorIn" component={VisitorInScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
