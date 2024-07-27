import {Alert, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useCallback} from 'react';
import Input from '../components/Input/Input';
import CustomButton from '../components/CustomButton/CustomButton';
import {authStyles as styles} from '../styles/auth';
import {screens} from '../utils/constant';
import validator from 'validator';
import {AuthContext} from '../context/AuthContext';

const CreateAccount = ({navigation}: {navigation: any}) => {
  const {signUp} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = useCallback(
    (name: string) => (text: string) => {
      setData(prevData => ({
        ...prevData,
        [name]: text,
      }));
    },
    [],
  );

  const handleCreate = useCallback(async () => {
    const {email, password, confirmPassword} = data;

    if (!validator.isEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUp({email, password});
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }, [data, signUp]);

  const isButtonDisabled = loading || Object.values(data).some(value => !value);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        disabled={isButtonDisabled}
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
