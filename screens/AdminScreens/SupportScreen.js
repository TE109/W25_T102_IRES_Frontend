import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import * as Clipboard from 'expo-clipboard';


const SupportScreen = ({ navigation }) => {
  const [newAccesscode, setnewAccesscode] = useState('');

  useEffect(() => {
    createAccessCode();

  
  },[]);

  const createAccessCode = async () => {
    try {
      
      const response = await fetch('http://10.0.2.2:3000/api/v1/access/create-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({type: "visitor"})
      });

      const data = await response.json();

      if (response.ok) {
        setnewAccesscode(data.access.accessCode)
      } else {
        Alert.alert('Error', data.message || 'Failed to load access code');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  const handleHome = () => {
    navigation.navigate('AdminMenuScreen');
  };

  //onPress={() => copyText(newAccesscode)}
  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
        <Text style={styles.homeButtonText}>🏠 Admin</Text>
      </TouchableOpacity>

      <Text style={styles.title}>New access code created</Text>
      <Text style={styles.description}>
      Your new access code is:
      </Text>
      <Text style={styles.email}>{newAccesscode}</Text>
        
      <TouchableOpacity style={styles.button} onPress={() => Clipboard.setString(newAccesscode)}>
        <Text style={styles.buttonText}>📋Copy</Text>
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
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Dimmed color for disabled button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
});

export default SupportScreen;
