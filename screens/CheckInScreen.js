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
        <Button title="Visit/Appointment" onPress={handleVisitAppointment}/>
          
        <Button title="Delivery" onPress={handleDelivery}/>
        
        
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


});

export default CheckInScreen;
