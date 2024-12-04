import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Use only this Picker

const SelectVisitorBusinessScreen = ({ navigation }) => {
  const [selectedBusiness, setSelectedBusiness] = useState('');

  // List of businesses or people to visit by default
  const businesses = [
    'Amazon',
    'RBC',
    'THJ',
    'Cats co',
  ];

  //handkeNext to validate the selection and navigate to Vistor Appoinment screen
  const handleNext = () => {
    if (!selectedBusiness) {
      Alert.alert('Selection Required', 'Please select who you are visiting.');
      return;
    }
    navigation.navigate('VisitorAppointment', { business: selectedBusiness });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.subtitle}>Please select who you are visiting.</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBusiness}
            onValueChange={(itemValue) => setSelectedBusiness(itemValue)} //Show list of business from saved data
            style={styles.picker}
          >
            <Picker.Item label="Select an option" value="" />
            {businesses.map((business, index) => (
              <Picker.Item key={index} label={business} value={business} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}> 
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    width: '80%',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default SelectVisitorBusinessScreen;
