import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getToken } from '../TokenStorage';

const FinishAccountSetupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch('http://10.0.2.2:3000/api/v1/account/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account setup completed!');
        navigation.navigate('AdminMenuScreen');
      } else {
        Alert.alert('Error', result.message || 'Failed to complete account setup.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.message}>
        You have finished setting up your account. Click finish.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} disabled={loading}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.finishButton]} 
          onPress={handleFinish} 
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Finish</Text>}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  finishButton: {
    backgroundColor: '#4CAF50', // Green color for the finish button
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default FinishAccountSetupScreen;
