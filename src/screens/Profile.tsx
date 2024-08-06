import React, {useCallback, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import CustomButton from '../components/CustomButton';

const Profile = () => {
  const {signOut, user} = useContext(AuthContext);

  const handleLogOut = useCallback(async () => {
    try {
      signOut();
    } catch (error) {
      console.error('Error', error);
    }
  }, [signOut]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile Information</Text>
      <IonIcons
        name="person-circle-outline"
        size={300}
        color="black"
        style={styles.portrait}
      />
      {/* <TouchableOpacity>
        <Text style={styles.editButton}>Edit Profile</Text>
      </TouchableOpacity> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>Email: {user?.email}</Text>
      </View>
      <CustomButton
        text="Logout"
        onPress={handleLogOut}
        style={styles.logoutBtn}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    paddingBottom: 50,
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 30,
    paddingTop: 10,
    textAlign: 'center',
    color: colors.secondary,
  },
  portrait: {
    alignSelf: 'center',
  },
  editButton: {
    fontFamily: fonts.InterExtraBold,
    textAlign: 'right',
    color: colors.primary,
    fontSize: 22,
    paddingVertical: 10,
  },
  details: {
    fontSize: 22,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginTop: 'auto',
    width: 150,
    alignSelf: 'center',
  },
  detailsContainer: {
    marginVertical: 10,
  },
});
