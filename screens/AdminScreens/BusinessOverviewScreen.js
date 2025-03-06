import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3000/api/v1/company';

const BusinessOverviewScreen = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(BASE_URL, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });
      setBusinesses(response.data.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  const handleAddMore = () => {
    navigation.navigate('AddBusinessDetails', { refresh: fetchBusinesses });
  };

  const handleEdit = (business) => {
    navigation.navigate('EditBusinessScreen', { business, refresh: fetchBusinesses });
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Business', 'Are you sure you want to delete this business?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}?eid=${id}`, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });
            fetchBusinesses();
          } catch (error) {
            console.error('Error deleting business:', error);
          }
        },
      },
    ]);
  };

  const renderBusinessItem = ({ item }) => (
    <View style={styles.businessCard}>
      <Text style={styles.businessName}>{item.name}</Text>
      <Text style={styles.businessDetails}>{item.floor ? `On the ${item.floor} floor.` : ''} {item.room ? `Room number ${item.room}.` : ''}</Text>
      <Text style={styles.businessPhone}>{item.phone}</Text>
      <View style={styles.cardButtonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Review business details. Edit, delete, or add more businesses.</Text>
      <FlatList data={businesses} renderItem={renderBusinessItem} keyExtractor={(item) => item._id} style={styles.list} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddMore}>
          <Text style={styles.buttonText}>Add More Businesses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinishAccountSetup')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#FAF9F6' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 20 
  },
  list: { 
    flex: 1 
  },
  businessCard: { 
    padding: 15, 
    backgroundColor: '#FFF', 
    borderRadius: 8, marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#CCC' 
  },
  businessName: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  businessDetails: { 
    fontSize: 14, 
    color: '#555', 
    marginVertical: 5 
  },
  businessPhone: { 
    fontSize: 14, 
    color: '#555' 
  },
  cardButtonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  editButton: { 
    padding: 10, 
    backgroundColor: '#D3D3D3', 
    borderRadius: 8, 
    flex: 1, 
    marginRight: 5, 
    alignItems: 'center' 
  },
  editButtonText: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  deleteButton: { 
    padding: 10, 
    backgroundColor: '#FF6666', 
    borderRadius: 8, 
    flex: 1, 
    marginLeft: 5, 
    alignItems: 'center' 
  },
  deleteButtonText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  button: { 
    backgroundColor: '#D3D3D3', 
    padding: 15, 
    borderRadius: 8, 
    flex: 1, 
    marginHorizontal: 5, 
    alignItems: 'center' },
  buttonText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#000' },
});

export default BusinessOverviewScreen;
