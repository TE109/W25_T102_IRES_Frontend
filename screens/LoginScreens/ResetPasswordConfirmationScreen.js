import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ResetPasswordConfirmationScreen = ({ navigation }) => {
  const handleGoToMainMenu = () => {
    // Navigate to the main menu (e.g., Home or Sign-In Screen)
    navigation.navigate('SignInOrSignUp');
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Password has been reset. Please click the button to return to the main menu.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGoToMainMenu}>
        <Text style={styles.buttonText}>Go back to main menu</Text>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  alertButton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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

export default ResetPasswordConfirmationScreen;
