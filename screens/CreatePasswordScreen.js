import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CreatePasswordScreen = ({ navigation, route }) => {
  const { email } = route.params; // Get email passed from previous screen
  const [password, setPassword] = useState('');
  const [hintVisible, setHintVisible] = useState(false);

  const handleNext = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/; // 8–12 chars, letters & numbers
    if (!passwordRegex.test(password)) {
      Alert.alert('Invalid Password', 'Your password must be 8–12 characters and include letters and numbers.');
      return;
    }

    // Proceed to the next screen, passing email & password
    navigation.navigate('EnterPhoneNumber', { email, password });
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const toggleHint = () => {
    setHintVisible(!hintVisible); // Toggle password hint
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Create a password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleHint} style={styles.hintButton}>
          <Text style={styles.hintIcon}>ℹ️</Text>
        </TouchableOpacity>
      </View>
      {hintVisible && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Password requirements:</Text>
          <Text style={styles.hintDetail}>8–12 characters</Text>
          <Text style={styles.hintDetail}>Must include letters & numbers</Text>
          <Text style={styles.hintDetail}>No spaces allowed</Text>
          <TouchableOpacity onPress={toggleHint}>
            <Text style={styles.closeHint}>Got it</Text>
          </TouchableOpacity>
        </View>
      )}
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
