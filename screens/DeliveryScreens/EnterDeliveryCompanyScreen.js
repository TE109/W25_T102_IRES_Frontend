import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EnterDeliveryCompanyScreen = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState('');
  const { phoneNumber } = route.params;

  const handleNext = async () => {
    if (!companyName.trim()) {
      Alert.alert('Company Name Required', 'Please enter your delivery company name to proceed.');
      return;
    }
    
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/v1/delivery/request-code', {
        companyName,
        phoneNumber,
      });
      
      if (response.status === 200) {
        Alert.alert('Success', 'Your delivery access code has been requested.');
        navigation.navigate('SelectDeliveryCompany', { companyName, phoneNumber });
      } else {
        Alert.alert('Error', 'Failed to request access code.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    }
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text> 
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !companyName.trim() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!companyName.trim()}
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
