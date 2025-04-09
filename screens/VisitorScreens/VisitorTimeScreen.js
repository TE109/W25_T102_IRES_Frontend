import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
//Visitor Appoinment Screen
//Also added handler functions as the previous screens for event Listeners
const VisitorAppointmentScreen = ({ navigation, route }) => {
  const [appointmentTime, setAppointmentTime] = useState('');
  const { fullName, phoneNumber, reason, selectedBusiness } = route.params;

  //navigate to Waiting for approval - visitor
  //appoinmentTime param

    
  
  const handleNext = async () => {
    const userData ={
      full_name: fullName, 
      reason_for_visit: reason,
      phoneNumber: phoneNumber
    };
    // Proceed to the next step (or skip if no time entered)
      try{
        
              const response = await fetch('http://10.0.2.2:3000/api/v1/visitor',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body:JSON.stringify(userData)
              });              
              if(response.ok){
                navigation.navigate('WaitingForApprovalVisitor', {phoneNumber});
              }else{
                Alert.alert(`Error: ${response.message || 'something went wrong'}`);
              }
          }catch (error){
              Alert.alert(`Error: ${error.message}`);
          }
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>
          Please enter the appointment time if applicable. If there's no specific time, tap 'Next' to skip this step.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter appointment time (e.g., 3:00 PM)"
          value={appointmentTime}
          onChangeText={setAppointmentTime}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f2e3',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default VisitorAppointmentScreen;
