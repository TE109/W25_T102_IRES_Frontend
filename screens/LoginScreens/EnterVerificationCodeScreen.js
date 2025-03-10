import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterVerificationCodeScreen = ({ route, navigation }) => {
  const { email, password, phoneNumber } = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter a valid 6-digit verification code.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phoneNumber, code: verificationCode }),
      });

      const textResponse = await response.text();

      try {
        const result = JSON.parse(textResponse);
        if (response.ok) {
          // ✅ Store JWT Token if provided
          if (result.token) {
            await AsyncStorage.setItem('authToken', result.token);
          }

          // ✅ Navigate directly to AddBusinessDetailsScreen
          navigation.navigate('AddBusinessDetails', { email, phoneNumber });
        } else {
          Alert.alert('Error', result.message || 'Verification failed.');
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

  const handleBack = () => {
    navigation.goBack();
  };

  const showHint = () => {
    Alert.alert(
      'Verification Code Hint',
      'Enter the 6-digit code sent to your registered phone number.',
      [{ text: 'Okay' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.label}>
        Please enter the verification code that was sent to your phone to proceed
      </Text>

      {/* Input Field & Hint Button in One Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          keyboardType="number-pad"
          value={verificationCode}
          onChangeText={setVerificationCode}
          maxLength={6}
        />
        <TouchableOpacity onPress={showHint} style={styles.hintButton}>
          <Text style={styles.hintIcon}>i</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack} disabled={loading}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Next</Text>}
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#FFF',
    width: '80%',
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,  // Makes input take all available space
    height: '100%',
  },
  hintButton: {
    marginLeft: 10,  // Adds spacing from input
  },
  hintIcon: {
    fontSize: 18,
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

export default EnterVerificationCodeScreen;
