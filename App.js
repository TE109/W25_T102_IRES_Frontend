/*



*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CheckInScreen from './screens/CheckInScreen';
import VisitorInScreen from './screens/VisitorInScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CheckIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CheckIn" component={CheckInScreen} />
        <Stack.Screen name="VisitorInScreen" component={VisitorInScreen} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
