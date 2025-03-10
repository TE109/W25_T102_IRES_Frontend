import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const EnterVerificationCodeScreen = ({ route, navigation }) => {
  const { email, phoneNumber } = route.params; // Get email & phone from previous screen
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const codeRegex = /^[0-9]{6}$/;
    if (!codeRegex.test(verificationCode)) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-digit verification code.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:3000/api/v1/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phoneNumber, code: verificationCode }),
      });

      const result = await response.json();

      if (response.ok) {
        navigation.navigate('AddBusinessDetails', { email, phoneNumber });
      } else {
        Alert.alert('Error', result.message || 'Invalid verification code.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Please enter the verification code that was sent to your phone to proceed
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          keyboardType="number-pad"
          value={verificationCode}
          onChangeText={setVerificationCode}
          maxLength={6}
        />
        <TouchableOpacity onPress={showHint} style={styles.hintButton}>
          <Text style={styles.hintIcon}>❗</Text>
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
    textAlign: 'center',
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

export default EnterVerificationCodeScreen;
