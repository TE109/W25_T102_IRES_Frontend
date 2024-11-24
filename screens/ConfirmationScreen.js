import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

const ConfirmationScreen = ({ navigation }) => {
  const handleMainScreen = () => {
    navigation.navigate('CheckIn'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor-In</Text>
      <Text style={styles.message}>Correct access code</Text>
      <TouchableOpacity  style={styles.button} onPress={handleMainScreen}>
        <Text style={styles.buttonText}>Main Screen</Text>
      </TouchableOpacity >
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
    marginBottom: 30,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default ConfirmationScreen;
