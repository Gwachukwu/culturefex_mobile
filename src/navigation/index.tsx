// navigation/RootNavigation.tsx

import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import {screens} from '../utils/constant';
import {colors} from '../styles/colors';
import HomeTabs from './Hometabs';
import Profile from '../screens/Profile';
import HeaderLeft from '../components/Header/HeaderLeft';
import HeaderRight from '../components/Header/HeaderRight';
import {fonts} from '../styles/fonts';
import AuthProvider from '../context/AuthContextProvider';
import {AuthContext} from '../context/AuthContext';
import CreateQuiz from '../screens/CreateQuiz';
import CreateRecipe from '../screens/CreateRecipe';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name={screens.homeTabs}
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name={screens.profile} component={Profile} />
          <Stack.Screen name={screens.createQuiz} component={CreateQuiz} />
          <Stack.Screen name={screens.createRecipe} component={CreateRecipe} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name={screens.login} component={Login} />
          <Stack.Screen
            name={screens.createAccount}
            component={CreateAccount}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={colors.primary} />
          <StackNavigator />
        </SafeAreaView>
      </AuthProvider>
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
