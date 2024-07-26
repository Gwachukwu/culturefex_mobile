import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {screens} from '../utils/constant';
import {colors} from '../styles/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import QuizList from '../screens/QuizList';
import RecipeList from '../screens/RecipeList';
import {fonts} from '../styles/fonts';
import HeaderLeft from '../components/Header/HeaderLeft';
import HeaderRight from '../components/Header/HeaderRight';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case screens.home:
              iconName = focused ? 'home' : 'home-outline';
              return <IonIcons name={iconName} size={size} color={color} />;
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

const styles = StyleSheet.create({
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
