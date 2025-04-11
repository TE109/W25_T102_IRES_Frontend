import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// Visitor Screen 
const VisitorInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNoAccessCode = () => {
    navigation.navigate('RequestVisitorCode');
  };

  const handleEnter = async(req, res) => {

    try{

      const response = await fetch('http://10.0.2.2:3000/api/v1/sms/verify',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({accessCode: phoneNumber})});

       
      if (response.ok){
        navigation.navigate('Confirmation', { type: 'visitor' });
      }
      else if(!response.ok){
        Alert.alert('Invalid Access Code', 'Please enter a valid access code.');
        return;

      }
      }
    
    catch(error){
      Alert.alert(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor-In</Text>
      <Text style={styles.subtitle}>
        Please enter the access code sent to your phone number.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter access code"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        {/*Apply disabled styling if no input*/}
        <TouchableOpacity
          style={[
            styles.button,
            !phoneNumber && styles.disabledButton, 
          ]}
          onPress={handleEnter}
          disabled={!phoneNumber}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.noCodeButton} onPress={handleNoAccessCode}>
        <Text style={styles.noCodeButtonText}>I don't have access code</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Dimmed color for disabled button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  noCodeButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  noCodeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000', // Match other buttons' text color
    textAlign: 'center',
  }
});

export default VisitorInScreen;
