import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for local storage

const HomeScreen = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register screens
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To check if user is logged in
  const [userData, setUserData] = useState(null); // Store user data when logged in

  // Check if the user is logged in when the app is loaded
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('loggedInUser');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  // Handle Login
  const handleLogin = async () => {
    try {
      // Retrieve stored user data using the username as key
      const storedUserData = await AsyncStorage.getItem(username);

      if (storedUserData) {
        // Parse the user data from string format
        const user = JSON.parse(storedUserData);

        // Check if entered password matches the stored password
        if (password === user.password) {
          Alert.alert('Success', 'You have logged in successfully!');
          setUserData(user); // Store the logged-in user data
          setIsLoggedIn(true); // Mark user as logged in

          // Store logged-in user information in AsyncStorage
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
          Alert.alert('Error', 'Incorrect password.');
        }
      } else {
        Alert.alert('Error', 'User does not exist.');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
  };

  // Handle Registration
  const handleRegister = async () => {
    if (fullName && username && password) {
      try {
        // Check if the username already exists
        const existingUserData = await AsyncStorage.getItem(username);

        if (existingUserData) {
          // If user exists, show an alert
          Alert.alert('Error', 'Username already exists. Please choose a different username.');
        } else {
          // Create a user object
          const user = {
            fullName,
            username,
            password,
          };

          // Store the user data in AsyncStorage using the username as the key
          await AsyncStorage.setItem(username, JSON.stringify(user));
          Alert.alert('Success', 'Registration successful! Please log in.');
          setIsRegistering(false); // After registration, switch to login page
          setFullName('');
          setUsername('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error saving data to AsyncStorage', error);
      }
    } else {
      Alert.alert('Error', 'All fields are required for registration.');
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    // Remove the logged-in user from AsyncStorage
    await AsyncStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{isLoggedIn ? 'Dashboard' : isRegistering ? 'Register' : 'Login'}</Text>
      </View>

      {isLoggedIn ? (
        <View style={styles.dashboard}>
          <Text style={styles.dashboardText}>Welcome, {userData.fullName}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <>
          {isRegistering ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button title="Register" onPress={handleRegister} />
              <Text style={styles.toggleText} onPress={() => setIsRegistering(false)}>
                Already have an account? Login
              </Text>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button title="Login" onPress={handleLogin} />
              <Text style={styles.toggleText} onPress={() => setIsRegistering(true)}>
                Don't have an account? Register
              </Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  toggleText: {
    color: '#007BFF',
    marginTop: 15,
    textAlign: 'center',
  },
  dashboard: {
    alignItems: 'center',
    marginTop: 20,
  },
  dashboardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
