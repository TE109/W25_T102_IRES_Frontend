import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

//Request Visitor Code Screen
//Similar Logic to Request Delivery Code
//Use useState to handle inputs for vistor Info
const RequestVisitorCodeScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');

  //handleNext function, validate input to prevent empty input and navigate
  const handleNext = () => {
    if (!fullName.trim()) {
      Alert.alert('Full Name Required', 'Please enter your full name to proceed.');
      return;
    }

    // Navigate to the phone input screen, passing the full name as a parameter
    navigation.navigate('RequestVisitorPhone', { fullName });
  };

  //handleBack function navigate to previous
  const handleBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Please enter your full name.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}> {/*Applied handleBack listener*/}
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}> {/*Applied handleNext listener*/}
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default RequestVisitorCodeScreen;
