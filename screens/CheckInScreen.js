import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const CheckInScreen = ({ navigation }) => {
  const handleVisitAppointment = () => {
    // Navigate to the Visit/Appointment screen or handle logic
    navigation.navigate('VisitorInScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.subtitle}>What brings you in today?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VisitorIn')}>
        <Text style={styles.buttonText}>Visit/Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6', // Matching the light beige color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D3D3D3', // Light gray color for the button
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

export default CheckInScreen;
