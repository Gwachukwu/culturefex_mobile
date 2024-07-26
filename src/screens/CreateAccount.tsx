import {Alert, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';
import validator from 'validator';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccount = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleChange = (name: string) => (text: string) => {
    setData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };

  const handleCreate = async () => {
    const {email, password, confirmPassword} = data;

    if (!validator.isEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate(screens.homeTabs);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/app_icon.png')} style={styles.logo} />
      <Text style={styles.header}>
        Create{'\n'}your{'\n'}culturefex{'\n'}account
      </Text>
      <Input
        label="Email"
        value={data.email}
        onChangeText={handleChange('email')}
      />
      <Input
        label="Password"
        isPassword
        value={data.password}
        onChangeText={handleChange('password')}
      />
      <Input
        label="Confirm Password"
        isPassword
        value={data.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
      />
      <CustomButton
        text="Create"
        onPress={handleCreate}
        disabled={loading || Object.values(data).some(value => !value)}
        loading={loading}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.login)}
        style={styles.anotherPage}>
        <Text style={styles.createText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateAccount;
