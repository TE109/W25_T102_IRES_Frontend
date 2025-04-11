
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import screens 
import CheckInScreen from './screens/CheckInScreen';
import VisitorInScreen from './screens/VisitorScreens/VisitorInScreen';
import DeliveryScreen from './screens/DeliveryScreens/DeliveryScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import RequestVisitorCodeScreen from './screens/VisitorScreens/RequestVisitorCodeScreen';
import RequestVisitorPhoneScreen from './screens/VisitorScreens/RequestVisitorPhoneScreen';
import EnterDeliveryCompanyScreen from './screens/DeliveryScreens/EnterDeliveryCompanyScreen';
import SelectDeliveryCompanyScreen from './screens/DeliveryScreens/SelectDeliveryCompanyScreen';
import RequestDeliveryCodeScreen from './screens/DeliveryScreens/RequestDeliveryCodeScreen';
import WaitingForApprovalDeliveryScreen from './screens/DeliveryScreens/WaitingForApprovalDeliveryScreen';
import VisitorReasonScreen from './screens/VisitorScreens/VisitorReasonScreen';
import SelectVisitorBusinessScreen from './screens/VisitorScreens/SelectVisitorBusinessScreen';
import VisitorAppointmentScreen from './screens/VisitorScreens/VisitorTimeScreen';
import WaitingForApprovalVisitorScreen from './screens/VisitorScreens/WaitingForApprovalVisitorScreen';
import SignInOrSignUpScreen from './screens/LoginScreens/SignInOrSignUpScreen';
import SignInScreen from './screens/LoginScreens/SignInScreen';
import ResetPasswordScreen from './screens/LoginScreens/ResetPasswordScreen';
import ResetPasswordConfirmationScreen from './screens/LoginScreens/ResetPasswordConfirmationScreen';
import CreateAccountScreen from './screens/LoginScreens/CreateAccountScreen';
import CreatePasswordScreen from './screens/LoginScreens/CreatePasswordScreen';
import EnterPhoneNumberScreen from './screens/LoginScreens/EnterPhoneNumberScreen';
import EnterVerificationCodeScreen from './screens/LoginScreens/EnterVerificationCodeScreen';
import AddBusinessDetailsScreen from './screens/AdminScreens/AddBusinessDetailsScreen';
//import BusinessOverviewScreen from './screens/AdminScreens/BusinessOverviewScreen';
import EditBusinessScreen from './screens/AdminScreens/EditBusinessScreen';
import FinishAccountSetupScreen from './screens/AdminScreens/FinishAccountSetupScreen';
import AdminMenuScreen from './screens/AdminScreens/AdminMenuScreen';
import CheckInIntroductionScreen from './screens/AdminScreens/CheckInIntroductionScreen';
import AccountInfoScreen from './screens/AdminScreens/AccountInfoScreen';
import CreateAccesscodeScreen from './screens/AdminScreens/CreateAccesscodeScreen';
import EditBusinessOverview from './screens/AdminScreens/EditBusinessOverview';
import AddMoreBusiness from './screens/AdminScreens/AddMoreBusiness'

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
        <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ResetPasswordConfirmation" component={ResetPasswordConfirmationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
        <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumberScreen} />
        <Stack.Screen name="EnterVerificationCode" component={EnterVerificationCodeScreen}/>
        <Stack.Screen name="AddBusinessDetails" component={AddBusinessDetailsScreen} />
        <Stack.Screen name="EditBusinessScreen" component={EditBusinessScreen}/>
        <Stack.Screen name="FinishAccountSetup" component={FinishAccountSetupScreen} />
        <Stack.Screen name="AdminMenuScreen" component={AdminMenuScreen} />
        <Stack.Screen name="CheckInIntroductionScreen" component={CheckInIntroductionScreen} options={{ title: 'Check-In' }}/>
        <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
        <Stack.Screen name="CreateAccesscodeScreen" component={CreateAccesscodeScreen} />
        <Stack.Screen name="EditBusinessOverview" component={EditBusinessOverview}/>
        <Stack.Screen name="AddMoreBusiness" component={AddMoreBusiness}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
