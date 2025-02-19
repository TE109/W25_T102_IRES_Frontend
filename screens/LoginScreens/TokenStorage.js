import AsyncStorage from '@react-native-async-storage/async-storage';

// Store token after successful login
module.exports.storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error("Error storing token", error);
  }
};

// Retrieve token
module.exports.getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};