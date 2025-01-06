import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CheckInScreen = ({ navigation }) => {
  // Navigate to SignInScreen
  const handleHome = () => {
    navigation.navigate('SignInOrSignUp');
  };

  // Navigate to VisitorInScreen
  const handleVisitAppointment = () => {
    navigation.navigate('VisitorInScreen');
  };

  // Navigate to DeliveryScreen
  const handleDelivery = () => {
    navigation.navigate('DeliveryScreen');
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleHome}>
        <Text style={styles.buttonText}>🏠 Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.subtitle}>What brings you in today?</Text>
      <View style={styles.buttonContainer}>
        {/* Visit/Appointment Button */}
        <TouchableOpacity style={styles.button} onPress={handleVisitAppointment}>
          <Text style={styles.buttonText}>Visit/Appointment</Text>
        </TouchableOpacity>
        {/* Delivery Button */}
        <TouchableOpacity style={styles.button} onPress={handleDelivery}>
          <Text style={styles.buttonText}>Delivery</Text>
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
    backgroundColor: '#f5f2e3',
    paddingHorizontal: 20,
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 100, // Adjusted width for the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3, // Adds shadow for a button effect
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default CheckInScreen;
