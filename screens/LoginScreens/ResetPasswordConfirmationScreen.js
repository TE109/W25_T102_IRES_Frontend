import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordConfirmationScreen = ({ navigation }) => {
  const handleGoToSignIn = () => {
    navigation.navigate('SignInScreen'); // Default to Sign-In
  };

  const handleGoToAdminMenu = () => {
    navigation.navigate('AdminMenuScreen'); // Option to return to Admin Menu
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset Successful</Text>
      <Text style={styles.subtitle}>
        Your password has been reset. Please choose an option below to proceed.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGoToSignIn}>
        <Text style={styles.buttonText}>Go to Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleGoToAdminMenu}>
        <Text style={styles.secondaryButtonText}>Go to Admin Menu</Text>
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  secondaryButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default ResetPasswordConfirmationScreen;
