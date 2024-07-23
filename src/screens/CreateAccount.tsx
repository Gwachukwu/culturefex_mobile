import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';

const CreateAccount = ({navigation}: {navigation: any}) => {
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
      <CustomButton text="Create" onPress={() => null} />
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.login)}
        style={styles.anotherPage}>
        <Text style={styles.createText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateAccount;
