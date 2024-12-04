import React, { useState } from 'react';
import { View, Text, TextInput,  StyleSheet, Alert, TouchableOpacity } from 'react-native';

//Delivery Screen
//Nevigation to confirmation screen
//Using usestate to store data
const DeliveryScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNoAccessCode = () => {
    navigation.navigate('RequestDeliveryCode'); // Navigate to RequestDeliveryCodeScreen
  };

  const handleEnter = () => {
    const phoneRegex = /^[0-9]{10}$/; // phone number validation, 10 digita
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    navigation.navigate('Confirmation', { type: 'delivery' });
  };

  const handleBack = () => {

    navigation.goBack(); // Navigate back to the previous screen
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery-In</Text>
      <Text style={styles.subtitle}>Please enter the access code sent to your phone number.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !phoneNumber && styles.disabledButton]}
          onPress={handleEnter}
          disabled={!phoneNumber} // Disable button if phone number is empty
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.noCodeButton} onPress={handleNoAccessCode}>
        <Text style={styles.buttonText}>I don't have access code</Text>
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
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
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  noCodeButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  }

});

export default DeliveryScreen;
