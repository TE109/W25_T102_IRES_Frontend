import React, { useState } from 'react';
import {getToken} from '../TokenStorage';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const AddMoreBusiness = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState(''); 
  const [businessName, setBusinessName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddBusiness = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    const token = await getToken();
    // Validation for required fields and phone number
    if (!businessName || !phoneNumber) {
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
  var companyId = ''

     try{
        const response = await fetch('http://10.0.2.2:3000/api/v1/company',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body:JSON.stringify(companyData),
  
        });
        
        const result = await response.json();
        companyId = result._id
        console.log(`add ${result._id}`)
      
  
        if(response.ok){
          Alert.alert('Company added successfully!');
  
        }else{
          Alert.alert(`Error: ${result.message || 'something went wrong'}`);
        }
      }catch (error){
        Alert.alert(`Error: ${error.message}`);
      }
  
    const newBusiness = {
      id: companyId,
      name: businessName,
      floor: floorNumber || 'N/A',
      room: roomNumber || 'N/A',
      phone: phoneNumber,
    };

    console.log(`add2 ${newBusiness.id}`)
  
   

    setBusinesses([...businesses, newBusiness]);
    setBusinessId('');
    setBusinessName('');
    setFloorNumber('');
    setRoomNumber('');
    setPhoneNumber('');
  };

  const handleNext = () => {
    if (businesses.length === 0) {
      Alert.alert('No Businesses Added', 'Please add at least one business before proceeding.');
      return;
    }
    navigation.navigate('EditBusinessOverview', { businesses });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Business</Text>
      <Text style={styles.instructions}>
        Please enter each business or company located within this facility, along with the corresponding room or floor number. 
        Don’t forget to click the 'Add' button to save each entry. Type 0 for floor or room number if it doesn't apply.
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
        />
        <TextInput
          style={styles.input}
          placeholder="Room Number"
          value={roomNumber}
          onChangeText={setRoomNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBusiness}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={businesses}
        renderItem={({ item }) => (
          <View style={styles.businessItem}>
            <Text style={styles.businessText}>{item.name}</Text>
            <Text style={styles.businessText}>Floor: {item.floor}</Text>
            <Text style={styles.businessText}>Room: {item.room}</Text>
            <Text style={styles.businessText}>Phone: {item.phone}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, businesses.length > 0 ? styles.nextButton : styles.disabledButton]}
          onPress={handleNext}
          disabled={businesses.length === 0}
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
  addButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    marginTop: 10,
  },
  businessItem: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  businessText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#D3D3D3',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default AddMoreBusiness;
