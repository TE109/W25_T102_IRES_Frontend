import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getToken } from './TokenStorage';

const EditBusinessScreen = ({ route, navigation }) => {
  const { business } = route.params;

  const [businessName, setBusinessName] = useState(business?.companyName || '');
  const [floorNumber, setFloorNumber] = useState(business?.companyFloor || '');
  const [roomNumber, setRoomNumber] = useState(business?.companyRoom || '');
  const [phoneNumber, setPhoneNumber] = useState(business?.companyPhone || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!businessName.trim() || !phoneNumber.trim()) {
      Alert.alert('Missing Information', 'Business name and phone number are required.');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const updatedBusiness = {
      companyName: businessName.trim(),
      companyFloor: floorNumber.trim() || 'N/A',
      companyRoom: roomNumber.trim() || 'N/A',
      companyPhone: phoneNumber.trim(),
    };

    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`http://10.0.2.2:3000/api/v1/company/${business._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedBusiness),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Business updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to update business.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Business/Company</Text>
      <Text style={styles.instructions}>Edit information about the business or company.</Text>

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
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={loading}>
          <Text style={styles.updateButtonText}>{loading ? 'Updating...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} disabled={loading}>
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
    color: '#000',
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
