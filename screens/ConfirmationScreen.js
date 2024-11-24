import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ConfirmationScreen = ({ navigation, route }) => {
  const { type } = route.params;

  const handleMainScreen = () => {
    navigation.navigate('CheckIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.message}>Correct access code!</Text>
      <Button title="Main Screen" style={styles.button} onPress={handleMainScreen}/>
       
      
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
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
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

export default ConfirmationScreen;
