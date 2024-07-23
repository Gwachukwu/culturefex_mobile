import {
  Image,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';

const Login = ({navigation}: {navigation: any}) => {
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
      <CustomButton text="Login" onPress={() => null} />
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.createAccount)}
        style={styles.anotherPage}>
        <Text style={styles.createText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
