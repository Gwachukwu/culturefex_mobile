import React, { useCallback, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogOut = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      signOut();
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
  }, [signOut]);

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>This is your profile</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
