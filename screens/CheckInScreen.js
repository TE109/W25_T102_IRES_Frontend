import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//We have 4 screens for the prototype
//Checkin Screen
//Add nevigation to Visitor Screen or Delivery Screen depends on the user input
const CheckInScreen = ({ navigation }) => {
  const handleVisitAppointment = () => {
    navigation.navigate('VisitorInScreen');
  };

  const handleDelivery = () => {
    navigation.navigate('DeliveryScreen');
  };

  //Add onPress listener ffor buttons to neviagate
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.subtitle}>What brings you in today?</Text>
      <View style={styles.buttonContainer}>
        
      <TouchableOpacity style={styles.button} onPress={handleVisitAppointment}>
          <Text style={styles.buttonText}>Visit/Appointment</Text>
        </TouchableOpacity>
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
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      textAlign: 'center',
    }


});

export default CheckInScreen;
