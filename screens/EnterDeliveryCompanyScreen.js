import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EnterDeliveryCompanyScreen = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState('');
  const { phoneNumber } = route.params; // Retrieve the phone number from the previous screen

  const handleNext = () => {
    if (!companyName.trim()) {
      Alert.alert('Company Name Required', 'Please enter your delivery company name to proceed.');
      return;
    }
  
    // Navigate to SelectDeliveryCompanyScreen
    navigation.navigate('SelectDeliveryCompany');
  };
  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Which delivery company are you with?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter company name"
          value={companyName}
          onChangeText={setCompanyName}
        />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !companyName.trim() && styles.disabledButton, // Optional: disable styling if input is empty
          ]}
          onPress={handleNext}
          disabled={!companyName.trim()} // Disable button if input is empty
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
    backgroundColor: '#FAF9F6',
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
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  }
});

export default EnterDeliveryCompanyScreen;
 