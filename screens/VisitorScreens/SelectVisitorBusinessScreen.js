import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const SelectVisitorBusinessScreen = ({ route, navigation }) => {
  const { fullName, phoneNumber, reason } = route.params; // Get visitor details from previous screen
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Fetch businesses from backend when screen loads
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/api/v1/business');
        const data = await response.json();

        if (response.ok) {
          setBusinesses(data);
        } else {
          Alert.alert('Error', data.message || 'Failed to load businesses.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleNext = () => {
    if (!selectedBusiness) {
      Alert.alert('No Business Selected', 'Please select the business you are visiting.');
      return;
    }

    navigation.navigate('VisitorTimeScreen', {
      fullName,
      phoneNumber,
      reason,
      business: selectedBusiness,
    });
  };

  const renderBusinessItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.businessItem, selectedBusiness === item.companyName && styles.selectedItem]}
      onPress={() => setSelectedBusiness(item.companyName)}
    >
      <Text style={styles.businessText}>{item.companyName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Business</Text>
      <Text style={styles.subtitle}>Please choose the business you are visiting.</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item._id}
          renderItem={renderBusinessItem}
          style={styles.list}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loading}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  businessItem: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#007BFF',
  },
  businessText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default SelectVisitorBusinessScreen;
