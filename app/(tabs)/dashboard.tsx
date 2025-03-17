import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = JSON.parse(await AsyncStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        navigation.navigate('login');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.fullName}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default DashboardScreen;
