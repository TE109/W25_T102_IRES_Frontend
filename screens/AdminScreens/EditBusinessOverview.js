import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import {getToken} from '../TokenStorage';
var mongoose = require('mongoose');
const EditBusinessOverview = ({ navigation, route }) => {
  const [businesses, setBusinesses] = useState(route.params?.businesses || []);

  const handleAddMore = () => {
    navigation.navigate('AddMoreBusiness', { existingBusinesses: businesses });
  };

  const handleEdit = (index) => {
    const businessToEdit = businesses[index];
    if (!businessToEdit) {
      console.error('Error: businessToEdit is undefined');
      return;
    }
    console.log(businessToEdit)
    //console.log('Navigating with:', businessToEdit);
    navigation.navigate('EditBusinessScreen', { 
      business: businessToEdit, 
      updateBusiness 
    });
  };

  const handleDelete = async (index) => {
    const business = businesses[index];
    const token = await getToken();
  
    Alert.alert(
      'Delete Business',
      'Are you sure you want to delete this business?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://10.0.2.2:3000/api/v1/company/${business.id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
  
              const result = await response.json();
  
              if (response.ok) {
                const updatedBusinesses = [...businesses];
                updatedBusinesses.splice(index, 1);
                setBusinesses(updatedBusinesses);
                Alert.alert('Business deleted successfully!');
              } else {
                Alert.alert(`Error: ${result.message || 'Something went wrong'}`);
              }
            } catch (error) {
              Alert.alert(`Error: ${error.message}`);
            }
          },
        },
      ]
    );
  };
  
  
  const updateBusiness = async (updatedBusiness) => {
    const updatedBusinesses = businesses.map((business) =>
      business.id === updatedBusiness.id ? updatedBusiness : business
    );
    //console.log(`updateBusiness ${business.id}`)
    setBusinesses(updatedBusinesses);
    
  };

 /*  useEffect(() =>{
    const fetchBusinesses = async () => {
      try {
        const token = await getToken();

        const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBusinesses(data);
        }else{
          Alert.alert('Error', data.message || 'Failed to load businesses');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', error.message || 'Something went wrong.');
      }
    };

    fetchBusinesses();
  }, []); */

  const renderBusinessItem = ({ item, index }) => (
    <View style={styles.businessCard}>
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>
        {item.floor ? `Floor ${item.floor}.` : ''}
        {item.room ? ` Room number ${item.room}.` : ''}
      </Text>
      <Text style={styles.businessPhone}>{item.phone}</Text>
      <View style={styles.cardButtonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(index)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Businesses</Text>
      <Text style={styles.subtitle}>
        Review the information for each business or company. Click the 'Edit' button to add or update details. To remove a business or company, click the 'Delete' button.
      </Text>
      <FlatList
        data={businesses}
        renderItem={renderBusinessItem}
        keyExtractor={(item) => item.id || item._id || item.name}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddMore}>
          <Text style={styles.buttonText}>Add More Companies/Businesses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminMenuScreen')}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  businessCard: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  businessDetails: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  businessPhone: {
    fontSize: 14,
    color: '#555',
  },
  cardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF6666',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
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
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EditBusinessOverview;
