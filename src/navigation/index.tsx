// navigation/RootNavigation.tsx

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import {screens} from '../utils/constant';
import {colors} from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';
import HomeTabs from './Hometabs';
import Profile from '../screens/Profile';
import HeaderLeft from '../components/Header/HeaderLeft';
import HeaderRight from '../components/Header/HeaderRight';
import { fonts } from '../styles/fonts';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}>
      {user ? (
        <>
          <Stack.Screen
            name={screens.homeTabs}
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name={screens.profile} component={Profile} />
        </>
      ) : (
        <>
          <Stack.Screen
            name={screens.login}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={screens.createAccount}
            component={CreateAccount}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: colors.secondary,
    fontFamily: fonts.InterBold,
  },
});
