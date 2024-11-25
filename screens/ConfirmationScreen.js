import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ConfirmationScreen = ({ navigation, route }) => {
  const { type } = route.params;

  const handleMainScreen = () => {
    navigation.navigate('CheckIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.message}>Correct access code!</Text>
      <Button title="Main Screen" onPress={handleMainScreen}/>
       
      
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
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 30,
  },

});

export default ConfirmationScreen;
