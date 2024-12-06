import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//Request Delivery Code Screen
// Similarly use Usestate to handle data
const RequestDeliveryCodeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  //handleNext to validate and navigate for event listener
  const handleNext = () => {
    const phoneRegex = /^[0-9]{10}$/; // Validate phone number, similar logic to previous screen
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    // Navigate to the company input screen, passing the phone number para
    navigation.navigate('EnterDeliveryCompany', { phoneNumber });
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
          maxLength={10} // Limit to 10 digits
        />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleBackToMain}> {/*Event listener, navigate to navigate screen*/}
          <Text style={styles.buttonText}>Main Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !phoneNumber.trim() && styles.disabledButton, // disable styling if input is empty
          ]}
          onPress={handleNext} //Function to validate before navigation
          disabled={!phoneNumber.trim()} // Disable button if input is empty
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
