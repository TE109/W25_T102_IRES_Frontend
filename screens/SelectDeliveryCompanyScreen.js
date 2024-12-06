import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For dropdown functionality

//Added default data of company located inside our building
//Use useState to handle inputs
const SelectDeliveryCompanyScreen = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState('');

  // List of companies by default at the building
  const companies = [
    'Amazon',
    'RBC',
    'THJ',
    'Cats co'
  ];

  //Similar concept using handleNext and handleBack for event Listeners
  //Validation and navigate to Waiting for Approval-Devlivery

  const handleNext = () => {
    if (!selectedCompany) {
      Alert.alert('Company Not Selected', 'Please select a company to proceed.');
      return;
    }
  
    // Navigate to the WaitingForApprovalDeliveryScreen
    navigation.navigate('WaitingForApprovalDelivery');
  };
  

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Who is this delivery for? Please select the company's name.</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedCompany}
            onValueChange={(itemValue) => setSelectedCompany(itemValue)}
          >
            <Picker.Item label="Select a company..." value="" />
            {companies.map((company, index) => (
              <Picker.Item key={index} label={company} value={company} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedCompany && styles.disabledButton, //  disable styling if no selection
          ]}
          onPress={handleNext}
          disabled={!selectedCompany} // Disable button if no company is selected
        >
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
    backgroundColor: '#f5f2e3',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdown: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
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
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  }
});

export default SelectDeliveryCompanyScreen;
