import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CheckInScreen = ({ navigation }) => {
  const handleVisitAppointment = () => {
    navigation.navigate('VisitorInScreen');
  };

  const handleDelivery = () => {
    navigation.navigate('DeliveryScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.subtitle}>What brings you in today?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Visit/Appointment" style={styles.button} onPress={handleVisitAppointment}/>
          
        <Button title="Delivery" style={styles.button} onPress={handleDelivery}/>
        
        
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
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default CheckInScreen;
