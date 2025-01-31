import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EnterPhoneNumberScreen = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { email, password } = route.params || {};

  const handleNext = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/v1/admin/verify-phone', {
        phoneNumber,
      });

      Alert.alert('Success', 'Phone number verified. Enter the code next.');
      navigation.navigate('EnterVerificationCode', { email, password, phoneNumber });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Phone Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10}
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