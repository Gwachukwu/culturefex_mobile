import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState, useCallback} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';
import validator from 'validator';
import {AuthContext} from '../context/AuthContext';

const Login = ({navigation}: {navigation: any}) => {
  const {signIn} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({email: '', password: ''});

  const handleChange = (name: string) => (text: string) => {
    setData(prevData => ({...prevData, [name]: text}));
  };

  const handleLogin = useCallback(async () => {
    const {email} = data;
    if (!validator.isEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    setLoading(true);
    try {
      await signIn(data);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, [data, signIn]);

  const isButtonDisabled = loading || !data.email || !data.password;

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
        disabled={isButtonDisabled}
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
