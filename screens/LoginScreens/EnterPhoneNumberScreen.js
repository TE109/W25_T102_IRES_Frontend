import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {storeToken} from '../TokenStorage';

const EnterPhoneNumberScreen = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { email, password } = route.params;
  const handleNext = async() => {
    const phoneRegex = /^[0-9]{10}$/; // Validate phone number (10 digits)
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    console.log({email}, {password}, {phoneNumber})
    navigation.navigate('AdminMenuScreen');

    try{
          const response = await fetch('http://10.0.2.2:3000/api/v1/admin/signup',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              phoneNumber
            }),
          });
          const data = await response.json();
    
          if(response.ok){
            const token = data.token;
    
            await storeToken(token);
    
            Alert.alert('Success', 'Account created!', [
              { text: 'OK', onPress: () => navigation.navigate('AdminMenuScreen') },
            ]);
            
          }else{
            Alert.alert(data.message || 'Account creation failed');
          }
    
        }catch (error){
          console.log(error);
          Alert.alert('Exception',error.message);
        }

  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const showHint = () => {
    Alert.alert(
      'Phone Number Hint',
      'Please enter your 10-digit phone number with no spaces.',
      [{ text: 'Okay' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10} // Limit input to 10 digits
        />
        <TouchableOpacity onPress={showHint} style={styles.hintButton}>
          <Text style={styles.hintIcon}>❗</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  hintButton: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
  hintIcon: {
    fontSize: 16,
    color: '#000',
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

export default EnterPhoneNumberScreen;
