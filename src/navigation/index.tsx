// navigation/RootNavigation.tsx

import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import QuizList from '../screens/QuizList';
import RecipeList from '../screens/RecipeList';
import {colors, fonts, screens} from '../utils/constant';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs({navigation}: {navigation: any}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerLeft: () => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(screens.home)}>
            <Image
              source={require('../assets/app_icon.png')}
              style={styles.headerImage}
            />
          </TouchableWithoutFeedback>
        ),
        headerRight: () => (
          <IonIcons
            name="person-outline"
            size={30}
            style={styles.leftHeaderPlaceholderIcon}
          />
        ),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case screens.home:
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            case screens.quizList:
              iconName = focused ? 'chat-question' : 'chat-question-outline';
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            case screens.recipeList:
              iconName = focused ? 'pot-steam' : 'pot-steam-outline';
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            default:
              return null;
          }
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}>
      <Tab.Screen name={screens.home} component={Home} />
      <Tab.Screen name={screens.quizList} component={QuizList} />
      <Tab.Screen name={screens.recipeList} component={RecipeList} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.homeTabs}
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.createAccount}
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.login}
        component={Login}
        options={{headerShown: false}}
      />
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
  tabBar: {
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
  },
  headerImage: {
    height: 40,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: colors.secondary,
    fontFamily: fonts.InterBold,
  },
  leftHeaderPlaceholderIcon: {
    padding: 5,
    backgroundColor: colors.neutral,
    color: colors.secondary,
    borderRadius: 20, // Half of width and height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
