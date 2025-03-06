import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CreatePasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters long.');
      return;
    }
    navigation.navigate('EnterPhoneNumber', { email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
  hintContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  hintText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hintDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeHint: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 10,
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
});

export default CreatePasswordScreen;
