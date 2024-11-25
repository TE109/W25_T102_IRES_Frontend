import React, { useState } from 'react';
import { View, Text, TextInput,  StyleSheet, Alert, Button } from 'react-native';

const DeliveryScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEnter = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    navigation.navigate('Confirmation', { type: 'delivery' });
  };

  const handleBack = () => {

    navigation.goBack(); // Navigate back to the previous screen
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery-In</Text>
      <Text style={styles.subtitle}>Please enter the access code sent to your phone number.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10}
      />
      <View style={styles.buttonContainer}>
      <Button title="Back" onPress={handleBack}/>
              <Button
                  title="Enter"
                  onPress={handleEnter}

                  disabled={!phoneNumber} // Disable button if phone number is empty
              />
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
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
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
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: 'white',
  }

});

export default DeliveryScreen;
