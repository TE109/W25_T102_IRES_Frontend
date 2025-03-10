import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getToken } from '../TokenStorage';

const AdminMenuScreen = ({ navigation }) => {
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = await getToken();

        if (!token) {
          Alert.alert('Session Expired', 'Please log in again.');
          navigation.replace('SignInScreen');
          return;
        }

        const response = await fetch('http://10.0.2.2:3000/api/v1/admin/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();

        if (response.ok) {
          setAdminName(result.name);
          setAdminRole(result.role);
        } else {
          Alert.alert('Error', result.message || 'Failed to load admin details.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Menu</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.adminInfo}>Welcome, {adminName} ({adminRole})</Text>
      )}

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('EditBusinessOverview')}
        >
          <Text style={styles.iconPlaceholder}>🏢</Text>
          <Text style={styles.menuText}>Businesses/Companies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('CheckInIntroductionScreen')}
        >
          <Text style={styles.iconPlaceholder}>✅</Text>
          <Text style={styles.menuText}>Check-In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('AccountInfoScreen')}
        >
          <Text style={styles.iconPlaceholder}>👤</Text>
          <Text style={styles.menuText}>Account Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('SupportScreen')}
        >
          <Text style={styles.iconPlaceholder}>📩</Text>
          <Text style={styles.menuText}>Support</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  adminInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuButton: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  iconPlaceholder: {
    fontSize: 30,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminMenuScreen;
