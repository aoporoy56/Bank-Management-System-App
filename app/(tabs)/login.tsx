import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      navigation.navigate('dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('register')}>Don't have an account? Register</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default LoginScreen;
