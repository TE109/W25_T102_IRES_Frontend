import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getToken } from '../TokenStorage'; // Ensure this function retrieves JWT token

const AccountInfoScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const token = await getToken();
        const response = await fetch('http://10.0.2.2:3000/api/v1/admin/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();

        if (response.ok) {
          setUserEmail(result.email);
        } else {
          Alert.alert('Error', result.message || 'Failed to fetch account details.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, []);

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Info</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userEmail || 'N/A'}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    width: '80%',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  resetButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default AccountInfoScreen;
