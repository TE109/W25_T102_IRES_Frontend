import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WaitingForApprovalDeliveryScreen = ({ navigation, route }) => {

  const [access, setAccess] = useState(null);
  const { phoneNumber} = route.params;
  useEffect(() => {
    const fetchAccessCode = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/api/v1/access/all-records', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const code = data.accessRecords[0].accessCode;
          setAccess(code);
        } else {
          Alert.alert('Error', data.message || 'Failed to load access code');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', error.message || 'Something went wrong.');
      }
    };
  
    fetchAccessCode();
  }, []);

  useEffect(() => {
    if (!access) return; 
  
    const sendAccess = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/api/v1/sms/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: `Your access code is ${access}`,
            to: String(phoneNumber),
          }),
        });
      } catch (error) {
        console.error('SMS send error:', error);
        Alert.alert('Error', error.message || 'Something went wrong.');
      }
    };
  
    sendAccess();
  }, [access]);  
  
    
  const handleMainScreen = () => {
    navigation.navigate('CheckIn'); // Navigate  to the checkin screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a new delivery entrance code</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Please wait for a text message with instructions.
        </Text>
        <Text style={styles.message}>Waiting for approval.....</Text>
      </View>
      <Text style={styles.instruction}>
        Please tap the button to go back to the main screen.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleMainScreen}>
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
