import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !username || !password) {
      alert('All fields are required!');
      return;
    }

    // Get existing users from AsyncStorage
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      alert('Username already exists!');
      return;
    }

    const newUser = { fullName, username, password };
    users.push(newUser);

    // Save the updated user list to AsyncStorage
    await AsyncStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('login')}>Already have an account? Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default RegisterScreen;
