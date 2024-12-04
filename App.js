/*



*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CheckInScreen from './screens/CheckInScreen';
import VisitorInScreen from './screens/VisitorInScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import RequestVisitorCodeScreen from './screens/RequestVisitorCodeScreen';
import RequestVisitorPhoneScreen from './screens/RequestVisitorPhoneScreen';
import EnterDeliveryCompanyScreen from './screens/EnterDeliveryCompanyScreen';
import SelectDeliveryCompanyScreen from './screens/SelectDeliveryCompanyScreen';
import RequestDeliveryCodeScreen from './screens/RequestDeliveryCodeScreen';
import WaitingForApprovalDeliveryScreen from './screens/WaitingForApprovalDeliveryScreen';
import VisitorReasonScreen from './screens/VisitorReasonScreen';
import SelectVisitorBusinessScreen from './screens/SelectVisitorBusinessScreen';
import VisitorAppointmentScreen from './screens/VisitorAppointmentScreen';
import WaitingForApprovalVisitorScreen from './screens/WaitingForApprovalVisitorScreen';

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
        <Stack.Screen name="RequestVisitorCode" component={RequestVisitorCodeScreen} />
        <Stack.Screen name="RequestVisitorPhone" component={RequestVisitorPhoneScreen} />
        <Stack.Screen name="EnterDeliveryCompany" component={EnterDeliveryCompanyScreen} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="RequestDeliveryCode" component={RequestDeliveryCodeScreen} />
        <Stack.Screen name="SelectDeliveryCompany" component={SelectDeliveryCompanyScreen} />
        <Stack.Screen name="WaitingForApprovalDelivery" component={WaitingForApprovalDeliveryScreen} />
        <Stack.Screen name="VisitorReason" component={VisitorReasonScreen} />
        <Stack.Screen name="SelectVisitorBusiness" component={SelectVisitorBusinessScreen} />
        <Stack.Screen name="VisitorAppointment" component={VisitorAppointmentScreen} />
        <Stack.Screen name="WaitingForApprovalVisitor" component={WaitingForApprovalVisitorScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
