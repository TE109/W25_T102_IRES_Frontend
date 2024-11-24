import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';

const VisitorInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEnter = () => {
    const phoneRegex = /^[0-9]{10}$/; // Validation for a 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    navigation.navigate('Confirmation', { type: 'visitor' }); // Pass 'visitor' as type
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor-In</Text>
      <Text style={styles.subtitle}>
        Please enter the access code sent to your phone number.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10} // Limit input to 10 characters
      />
      <View style={styles.buttonContainer}>
        <Button title="Back" style={styles.button} onPress={handleBack}/>
          
       
        <Button
          title="Enter" style={[styles.button, phoneNumber ? '' : styles.disabledButton]}
          onPress={handleEnter}
          
          disabled={!phoneNumber} // Disable button if phone number is empty
        />
         
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default VisitorInScreen;
