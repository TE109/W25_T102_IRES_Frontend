import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EnterPhoneNumberScreen = ({ route, navigation }) => {
  const { email, password } = route.params || {}; // ✅ Ensure password is retrieved
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/auth/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phoneNumber }),
      });

      const textResponse = await response.text(); // Read response as text first

      try {
        const result = JSON.parse(textResponse); // Try to parse JSON
        if (response.ok) {
          navigation.navigate('EnterVerificationCode', { email, phoneNumber });
        } else {
          Alert.alert('Error', result.message || 'Phone number verification failed.');
        }
      } catch (jsonError) {
        Alert.alert('Error', 'Invalid response from server.');
        console.error('Server response is not JSON:', textResponse);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Fetch Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default EnterPhoneNumberScreen;
