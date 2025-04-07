import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WaitingForApprovalVisitorScreen =({ navigation, route }) => {
  const handleGoToMain = () => {
    navigation.navigate('CheckIn'); // Navigate to the main screen
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <Text style={styles.message}>
        Please wait for a text message with instructions.{"\n"}
        Waiting for approval.....
      </Text>
      <Text style={styles.instruction}>
        Please tap the button to go back to the main screen.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToMain}>
        <Text style={styles.buttonText}>Main Screen</Text>
      </TouchableOpacity>
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
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default WaitingForApprovalVisitorScreen;
