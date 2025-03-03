import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

const EditBusinessOverview = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/api/v1/company');
      setBusinesses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load businesses.');
    }
  };

  const handleAddMore = () => {
    navigation.navigate('AddMoreBusiness', { existingBusinesses: businesses });
  };

  const handleEdit = (business) => {
    navigation.navigate('EditBusinessScreen', { business, updateBusiness });
  };

  const handleDelete = async (id) => {
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
              await axios.delete(`http://10.0.2.2:3000/api/v1/company/${id}`);
              setBusinesses(businesses.filter(business => business.id !== id));
              Alert.alert('Success', 'Business deleted successfully.');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete business.');
            }
          },
        },
      ]
    );
  };

  const updateBusiness = (updatedBusiness) => {
    setBusinesses(businesses.map(business => business.id === updatedBusiness.id ? updatedBusiness : business));
  };

  const renderBusinessItem = ({ item }) => (
    <View style={styles.businessCard}>
      <Text style={styles.businessName}>{item.companyName}</Text>
      <Text style={styles.businessDetails}>Floor: {item.companyFloor} | Room: {item.companyRoom}</Text>
      <Text style={styles.businessPhone}>{item.companyPhone}</Text>
      <View style={styles.cardButtonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Businesses</Text>
      <FlatList
        data={businesses}
        renderItem={renderBusinessItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddMore}>
          <Text style={styles.buttonText}>Add More Businesses</Text>
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
