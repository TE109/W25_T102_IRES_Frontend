import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//Request Delivery Code Screen
// Similarly use Usestate to handle data
const RequestDeliveryCodeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  //handleNext to validate and navigate for event listener
  const handleNext = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/delivery/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        navigation.navigate('EnterDeliveryCompany', { phoneNumber });
      } else {
        Alert.alert('Error', result.message || 'Failed to request delivery code.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  
  const handleBackToMain = () => {
    navigation.navigate('CheckIn'); // Navigate back to the Check in Screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Please enter phone number.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10} 
        />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleBackToMain}> 
        
          <Text style={styles.buttonText}>Main Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !phoneNumber.trim() && styles.disabledButton, 
          ]}
          
          onPress={handleNext} 
          disabled={!phoneNumber.trim()} 
        >
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
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
    justifyContent: 'center',
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
  disabledButton: {
    backgroundColor: '#A9A9A9'
  }
});

export default RequestDeliveryCodeScreen;
