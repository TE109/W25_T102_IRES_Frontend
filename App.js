
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import screens 
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
import Welcome from './screens/Welcome';
import SignInOrSignUpScreen from './screens/SignInOrSignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ResetPasswordConfirmationScreen from './screens/ResetPasswordConfirmationScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import CreatePasswordScreen from './screens/CreatePasswordScreen';
import EnterPhoneNumberScreen from './screens/EnterPhoneNumberScreen';
import EnterVerificationCodeScreen from './screens/EnterVerificationCodeScreen';
import AddBusinessDetailsScreen from './screens/AddBusinessDetailsScreen';
import BusinessOverviewScreen from './screens/BusinessOverviewScreen';
import EditBusinessScreen from './screens/EditBusinessScreen';
import FinishAccountSetupScreen from './screens/FinishAccountSetupScreen';
import AdminMenuScreen from './screens/AdminMenuScreen';
import CheckInIntroductionScreen from './screens/CheckInIntroductionScreen';
import AccountInfoScreen from './screens/AccountInfoScreen';
import SupportScreen from './screens/SupportScreen';
import EditBusinessOverview from './screens/EditBusinessOverview';
import AddMoreBusiness from './screens/AddMoreBusiness'

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
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ResetPasswordConfirmation" component={ResetPasswordConfirmationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
        <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumberScreen} />
        <Stack.Screen name="EnterVerificationCode" component={EnterVerificationCodeScreen}/>
        <Stack.Screen name="AddBusinessDetails" component={AddBusinessDetailsScreen} />
        <Stack.Screen name="BusinessOverview" component={BusinessOverviewScreen} />
        <Stack.Screen name="EditBusinessScreen" component={EditBusinessScreen}/>
        <Stack.Screen name="FinishAccountSetup" component={FinishAccountSetupScreen} />
        <Stack.Screen name="AdminMenuScreen" component={AdminMenuScreen} />
        <Stack.Screen name="CheckInIntroductionScreen" component={CheckInIntroductionScreen} options={{ title: 'Check-In' }}/>
        <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="EditBusinessOverview" component={EditBusinessOverview}/>
        <Stack.Screen name="AddMoreBusiness" component={AddMoreBusiness}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
