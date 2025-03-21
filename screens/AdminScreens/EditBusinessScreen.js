import React, { useState } from 'react';
import {getToken} from '../TokenStorage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const EditBusinessScreen = ({ route, navigation }) => {
  const { business, updateBusiness } = route.params;
  const [businessID, setBusinessID] = useState(business?._id || ''); 
  const [businessName, setBusinessName] = useState(business?.name || '');
  const [floorNumber, setFloorNumber] = useState(business?.floor || '');
  const [roomNumber, setRoomNumber] = useState(business?.room || '');
  const [phoneNumber, setPhoneNumber] = useState(business?.phone || '');

  const handleUpdate = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    const token = await getToken();
    if (!businessName.trim() || !phoneNumber.trim()) {
      Alert.alert('Missing Information', 'Business name and phone number are required.');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const companyData ={
      
      companyName: businessName,
      companyFloor: floorNumber,
      companyRoom: roomNumber,
      companyPhone: phoneNumber
  
    };

    try{
                const response = await fetch(`http://10.0.2.2:3000/api/v1/company/${business.id}`,{
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body:JSON.stringify(companyData),
          
                });
                
                const result = await response.json();
          
                if(response.ok){
                  Alert.alert('Company updated successfully!');
          
                }else{
                  Alert.alert(`Error: ${result.message || 'something went wrong'}`);
                }
              }catch (error){
                Alert.alert(`Error: ${error.message}`);
              }
          
            

    const updatedBusiness = {
      ...business,
      name: businessName.trim(),
      floor: floorNumber.trim() || 'N/A',
      room: roomNumber.trim() || 'N/A',
      phone: phoneNumber.trim(),
    };

    // Call the function passed via navigation params
    if (typeof updateBusiness === 'function') {
      updateBusiness(updatedBusiness); // Call update function
      navigation.goBack(); // Navigate back
    } else {
      Alert.alert('Error', 'Unable to update business. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Business/Company</Text>
      <Text style={styles.instructions}>
        Edit information about the business or company.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Business/Company's Name"
          value={businessName}
          onChangeText={setBusinessName}
        />
        <TextInput
          style={styles.input}
          placeholder="Floor Number"
          value={floorNumber}
          onChangeText={setFloorNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Room Number"
          value={roomNumber}
          onChangeText={setRoomNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  updateButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default EditBusinessScreen;
