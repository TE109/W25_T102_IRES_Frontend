import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WaitingForApprovalDeliveryScreen = ({ navigation }) => {
  const handleMainScreen = () => {
    navigation.navigate('CheckIn'); // Navigate  to the checkin screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Please wait for a text message with instructions.
        </Text>
        <Text style={styles.message}>Waiting for approval.....</Text>
      </View>
      <Text style={styles.instruction}>
        Please tap the button to go back to the main screen.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleMainScreen}>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
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

export default WaitingForApprovalDeliveryScreen;
