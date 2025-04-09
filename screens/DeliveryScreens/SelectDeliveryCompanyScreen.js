import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For dropdown functionality

//Added default data of company located inside our building
//Use useState to handle inputs
const SelectDeliveryCompanyScreen = ({ navigation, route }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [businesses, setBusinesses] = useState(route.params?.businesses || []);
  
  const { phoneNumber, companyName} = route.params;


  useEffect(() =>{
        const fetchBusinesses = async () => {
          try {
    
            const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
              method: 'GET',
              headers: {
              },
            });
    
            const data = await response.json();
            console.log(data.data[0].companyName)

    
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



  //Similar concept using handleNext and handleBack for event Listeners
  //Validation and navigate to Waiting for Approval-Devlivery

  const handleNext = async () => {
    const deliveryData ={
      delivery_company: companyName, 
      phonenumber: phoneNumber
    };
      try{
              const response = await fetch('http://10.0.2.2:3000/api/v1/delivery',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body:JSON.stringify(deliveryData)
              });              
              if(response.ok){
                navigation.navigate('WaitingForApprovalDelivery', {phoneNumber});
              }else{
                Alert.alert(`Error: ${response.message || 'something went wrong'}`);
              }
          }catch (error){
              Alert.alert(`Error: ${error.message}`);
          }
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
        {/*Disable button if no company is selected*/}
        {/*isable styling if no selection*/}
        <TouchableOpacity
          style={[
            styles.button,
            !selectedCompany && styles.disabledButton, 
          ]}
          onPress={handleNext}
          disabled={!selectedCompany} 
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
