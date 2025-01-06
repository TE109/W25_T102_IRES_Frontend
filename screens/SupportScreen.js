import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SupportScreen = ({ navigation }) => {
  const handleHome = () => {
    navigation.navigate('AdminMenuScreen');
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
        <Text style={styles.homeButtonText}>🏠 Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Support</Text>
      <Text style={styles.description}>
        If you need assistance or have any inquiries, please contact us at:
      </Text>
      <Text style={styles.email}>support@ires.com</Text>
      <Text style={styles.footer}>
        We are here to assist you with any issues or questions regarding the IRes system.
      </Text>
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
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
});

export default SupportScreen;
