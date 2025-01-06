import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CheckInScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    
    navigation.navigate('CheckIn'); 
  };

  const handleHome = () => {
    navigation.navigate('AdminMenuScreen'); // Ensure AdminMenuScreen is correctly named in your navigator
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
        <Text style={styles.homeButtonText}>🏠</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.instructions}>
        Upon clicking "Continue," you can return to the main menu only by selecting the home button in the top left corner.
        {'\n\n'}For security purposes, this action will require re-authentication, ensuring that a visitor cannot alter any data without proper access.
      </Text>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  homeButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CheckInScreen;
