import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <View style={styles.menuContainer}>
        {/* Businesses/Companies Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('EditBusinessOverview')}
        >
          <Text style={styles.iconPlaceholder}>🏢</Text>
          <Text style={styles.menuText}>Businesses/Companies</Text>
        </TouchableOpacity>

        {/* Check-In Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('CheckInIntroductionScreen')}
        >
          <Text style={styles.iconPlaceholder}>✅</Text>
          <Text style={styles.menuText}>Check-In</Text>
        </TouchableOpacity>

        {/* Account Info Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('AccountInfoScreen')}
        >
          <Text style={styles.iconPlaceholder}>👤</Text>
          <Text style={styles.menuText}>Account Info</Text>
        </TouchableOpacity>

        {/* Support Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('SupportScreen')}
        >
          <Text style={styles.iconPlaceholder}>🚪</Text>
          <Text style={styles.menuText}>Create new access code</Text>
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
