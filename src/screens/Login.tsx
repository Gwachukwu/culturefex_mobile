import {Alert, DevSettings, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';
import validator from 'validator';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (name: string) => (text: string) => {
    setData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };

  const handleLogin = async () => {
    const {email, password} = data;

    if (!validator.isEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email');
    }

    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        AsyncStorage.setItem('user', JSON.stringify(user));
        DevSettings.reload()
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: screens.homeTabs }],
        // });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/app_icon.png')} style={styles.logo} />
      <Text style={styles.header}>
        Login{'\n'}to{'\n'}culturefex
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
      <CustomButton
        text="Login"
        onPress={handleLogin}
        disabled={loading || Object.values(data).some(value => !value)}
        loading={loading}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.createAccount)}
        style={styles.anotherPage}>
        <Text style={styles.createText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
