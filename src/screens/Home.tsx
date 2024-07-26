import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {screens} from '../utils/constant';

const Home = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Text>This is the home</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate(screens.login)} // Should match the type in RootStackParamList
      />
      <Text></Text>
      <Button
        title="Go to Create Account"
        onPress={() => navigation.navigate(screens.createAccount)} // Should match the type in RootStackParamList
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
