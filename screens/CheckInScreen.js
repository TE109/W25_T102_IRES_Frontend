import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//Checkin Screen
//Add nevigation to Visitor Screen or Delivery Screen depends on the user input
const CheckInScreen = ({ navigation }) => {
  //Handle button listener when user select the purpose of visit
  const handleVisitAppointment = () => {
    navigation.navigate('VisitorInScreen'); //Navigate to VisitorInScreen 
  };

  const handleDelivery = () => {
    navigation.navigate('DeliveryScreen'); //Navigate to DeliveryScreen
  };

  //Add onPress listener for buttons to neviagate
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.subtitle}>What brings you in today?</Text>
      <View style={styles.buttonContainer}>
        
        {/*Using TouchableOpacity*/}
        {/*User Select either of the purposes to be navigated to VisitorInScreen or DeliveryScreen*/}
        {/*Using onPress for event listener*/ }

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
