import React, { useState } from 'react';
import { View, Text, TextInput,  StyleSheet, Alert, Button } from 'react-native';

const DeliveryScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEnter = () => {
    const phoneRegex = /^[0-9]{10}$/;
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
      <Button title="Back" style={styles.button} onPress={handleBack}/>
      <Button title="Enter" style={styles.button} onPress={handleEnter}/>
        
      
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
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default DeliveryScreen;
