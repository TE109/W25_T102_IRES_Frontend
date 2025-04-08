import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Use only this Picker

const SelectVisitorBusinessScreen = ({ navigation, route }) => {
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [businesses, setBusinesses] = useState(route.params?.businesses || []);
  
  const { fullName, phoneNumber, reason } = route.params;

  useEffect(() =>{
            const fetchBusinesses = async () => {
              try {
        
                const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
                  method: 'GET',
                  headers: {
                  },
                });
        
                const data = await response.json();    
        
                if (response.ok) {
                  setBusinesses(data.data);        
                }else{
                  Alert.alert('Error', data.message || 'Failed to load businesses');
                }
              } catch (error) {
                console.error('Fetch error:', error);
                Alert.alert('Error', error.message || 'Something went wrong.');
              }
            };
        
            fetchBusinesses();
          }, []);

 

  //handkeNext to validate the selection and navigate to Vistor Appoinment screen
  const handleNext = () => {
    if (!selectedBusiness) {
      Alert.alert('Selection Required', 'Please select who you are visiting.');
      return;
    }
    console.log(selectedBusiness, fullName, phoneNumber, reason)
    navigation.navigate('VisitorAppointment', { selectedBusiness, reason, fullName, phoneNumber });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.subtitle}>Please select who you are visiting.</Text>
        {/*Show list of business from saved data*/}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBusiness}
            onValueChange={(itemValue) => setSelectedBusiness(itemValue)} 
            style={styles.picker}
          >
            <Picker.Item label="Select an option" value="" />
            {businesses.map((company, index) => (
               <Picker.Item key={index} label={company.companyName} value={company.companyName} />
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
    backgroundColor: '#f5f2e3',
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
