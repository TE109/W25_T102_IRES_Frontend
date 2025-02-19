import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {storeToken} from './TokenStorage.js';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignIn  = async() => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try{
      const response = await fetch('http://10.0.2.2:3000/api/v1/admin/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if(response.ok){
        const token = data.token;

        await storeToken(token);

        Alert.alert('Success', 'You are signed in!', [
          { text: 'OK', onPress: () => navigation.navigate('AdminMenuScreen') },
        ]);
        
      }else{
        Alert.alert(data.message || 'Login failed');
      }

    }catch (error){
      console.log(error);
      Alert.alert('Exception',error.message);
    }

  };

  

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.infoIcon}>❕</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.infoIcon}>❕</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset password</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    width: '80%',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  infoIcon: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
  },
  resetButton: {
    marginBottom: 20,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'center',
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
  resetButton: {
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
