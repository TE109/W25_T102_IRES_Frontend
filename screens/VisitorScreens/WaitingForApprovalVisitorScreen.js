import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const WaitingForApprovalVisitorScreen =({ navigation, route }) => {

const [access, setAccess] = useState(route.params?.businesses || []);
const { phoneNumber} = route.params;
  useEffect(() =>{
            const fetchAccessCode = async () => {
              
              try {
        
                const response = await fetch('http://10.0.2.2:3000/api/v1/access/all-records', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
        
                const data = await response.json();    
                //console.log(data.accessRecords[0].accessCode)
        
                if (response.ok) {
                  setAccess(data.accessRecords[0].accessCode);  
                  //console.log(access)      
                }else{
                  Alert.alert('Error', data.message || 'Failed to load businesses');
                }
              } catch (error) {
                console.error('Fetch error:', error);
                Alert.alert('Error', error.message || 'Something went wrong.');
              }
            };
        
            fetchAccessCode();
            

            const sendAccess = async () => {
              try {
                //console.log(access)
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
                console.error('Fetch error:', error);
                Alert.alert('Error', error.message || 'Something went wrong.');
              }
              console.log("check")
            };

            sendAccess();

            
          }, []);

          



  const handleGoToMain = () => {
    navigation.navigate('CheckIn'); // Navigate to the main screen
  };

  

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request entrance code as a visitor</Text>
      <Text style={styles.message}>
        Please wait for a text message with instructions.{"\n"}
        Waiting for approval.....
      </Text>
      <Text style={styles.instruction}>
        Please tap the button to go back to the main screen.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoToMain}>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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

export default WaitingForApprovalVisitorScreen;
