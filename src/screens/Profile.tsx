import React from 'react';
import {Button, DevSettings, StyleSheet, Text, View} from 'react-native';
import {screens} from '../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signOut} from 'firebase/auth';
import {auth} from '../utils/firebase';

const Profile = ({navigation}: {navigation: any}) => {
  const handleLogOut = async () => {
    await AsyncStorage.removeItem('user');
    DevSettings.reload();
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>This is your profile</Text>
      <Button
        title="Logout"
        onPress={handleLogOut} // Should match the type in RootStackParamList
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
