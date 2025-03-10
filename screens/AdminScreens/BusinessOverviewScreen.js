import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { getToken } from '../TokenStorage';

const BusinessOverviewScreen = ({ navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch businesses from the backend when the screen loads
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = await getToken();
        const response = await fetch('http://10.0.2.2:3000/api/v1/company', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();

        if (response.ok) {
          setBusinesses(result);
        } else {
          Alert.alert('Error', result.message || 'Failed to load businesses.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

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
              const token = await getToken();
              const response = await fetch(`http://10.0.2.2:3000/api/v1/company/${id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

              if (response.ok) {
                setBusinesses(businesses.filter((business) => business._id !== id));
                Alert.alert('Success', 'Business deleted successfully.');
              } else {
                const result = await response.json();
                Alert.alert('Error', result.message || 'Failed to delete business.');
              }
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (business) => {
    navigation.navigate('EditBusinessScreen', { business });
  };

  const handleAddMore = () => {
    navigation.navigate('AddBusinessDetails');
  };

  const renderBusinessItem = ({ item }) => (
    <View style={styles.businessCard}>
      <Text style={styles.businessName}>{item.companyName}</Text>
      <Text style={styles.businessDetails}>
        {item.companyFloor ? `On the ${item.companyFloor} floor.` : ''}
        {item.companyRoom ? ` Room number ${item.companyRoom}.` : ''}
      </Text>
      <Text style={styles.businessPhone}>{item.companyPhone}</Text>
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
      <Text style={styles.title}>Business Overview</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.subtitle}>
            Review the information for each business or company. Click the 'Edit' button to update details or the 'Delete' button to remove a business.
          </Text>
          <FlatList
            data={businesses}
            renderItem={renderBusinessItem}
            keyExtractor={(item) => item._id}
            style={styles.list}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddMore}>
              <Text style={styles.buttonText}>Add More Businesses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinishAccountSetup')}>
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

export default BusinessOverviewScreen;
