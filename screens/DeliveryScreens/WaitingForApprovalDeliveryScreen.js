import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const WaitingForApprovalDeliveryScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/api/v1/delivery/status?phoneNumber=${phoneNumber}`);
        if (response.data.approved) {
          setIsApproved(true);
          Alert.alert('Approved', 'Your delivery has been approved!');
          navigation.navigate('Confirmation', { type: 'delivery' });
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to check approval status.');
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(checkApprovalStatus, 5000);
    return () => clearInterval(interval);
  }, [navigation, phoneNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.messageContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Text style={styles.message}>Waiting for approval.....</Text>
        )}
      </View>
      <Text style={styles.instruction}>Please wait for a text message with instructions.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CheckIn')}>
        <Text style={styles.buttonText}>Main Screen</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default WaitingForApprovalDeliveryScreen;
