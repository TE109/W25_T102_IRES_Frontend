import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Confrimation screen
//Nevigation to checkin screen
const ConfirmationScreen = ({ navigation, route }) => {
  const { type } = route.params;
  //Handle button listener when the access code is correct

  const handleMainScreen = () => {
    navigation.navigate('CheckIn'); //Navigate to CheckinScreen 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.message}>Correct access code!</Text>
      <TouchableOpacity style={styles.button} onPress={handleMainScreen}>
        <Text style={styles.buttonText}>Main Screen</Text> {/*Naviagte to checkin screen */}
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
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3, // Adds shadow for button effect
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  }

});

export default ConfirmationScreen;
