import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectDeliveryCompanyScreen = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available companies from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/api/v1/company');
        const data = await response.json();

        if (response.ok) {
          setCompanies(data);
        } else {
          Alert.alert('Error', data.message || 'Failed to load companies.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleNext = () => {
    if (!selectedCompany) {
      Alert.alert('Company Not Selected', 'Please select a company to proceed.');
      return;
    }

    navigation.navigate('WaitingForApprovalDelivery', { selectedCompany });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Delivery Entrance Code</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Who is this delivery for? Please select the company's name.</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.dropdown}>
            <Picker selectedValue={selectedCompany} onValueChange={(itemValue) => setSelectedCompany(itemValue)}>
              <Picker.Item label="Select a company..." value="" />
              {companies.map((company) => (
                <Picker.Item key={company._id} label={company.companyName} value={company.companyName} />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !selectedCompany && styles.disabledButton]}
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
  },
});

export default SelectDeliveryCompanyScreen;
