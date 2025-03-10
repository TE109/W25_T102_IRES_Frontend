import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBusinessDetailsScreen = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to retrieve JWT token
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  // Fetch businesses from the backend when the screen loads
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = await getToken();

        const headers = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
          method: 'GET',
          headers,
        });

        const textResponse = await response.text();
        try {
          const result = JSON.parse(textResponse);
          if (response.ok) {
            setBusinesses(result);
          } 
        } catch (jsonError) {
          console.error('Invalid JSON response:', textResponse);
          Alert.alert('Error', 'Invalid response from the server.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // Add a new business
  const handleAddBusiness = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    const token = await getToken();

    if (!businessName || !phoneNumber) {
      Alert.alert('Missing Information', 'Business name and phone number are required.');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const companyData = {
      companyName: businessName,
      companyFloor: floorNumber || 'N/A',
      companyRoom: roomNumber || 'N/A',
      companyPhone: phoneNumber
    };

    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
        method: 'POST',
        headers,
        body: JSON.stringify(companyData),
      });

      const textResponse = await response.text();
      try {
        const result = JSON.parse(textResponse);
        if (response.ok) {
          setBusinesses([...businesses, result]);
          Alert.alert('Success', 'Company added successfully!');
        } else {
          Alert.alert('Error', result.message || 'Something went wrong');
        }
      } catch (jsonError) {
        console.error('Invalid JSON response:', textResponse);
        Alert.alert('Error', 'Invalid response from the server.');
      }
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
    }

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
    navigation.navigate('BusinessOverviewScreen', { businesses });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Business</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.instructions}>
            Please enter each business or company located within this facility, along with the corresponding room or floor number.
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
                <Text style={styles.businessText}>{item.companyName}</Text>
                <Text style={styles.businessText}>Floor: {item.companyFloor}</Text>
                <Text style={styles.businessText}>Room: {item.companyRoom}</Text>
                <Text style={styles.businessText}>Phone: {item.companyPhone}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
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
        </>
      )}
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

export default AddBusinessDetailsScreen;
