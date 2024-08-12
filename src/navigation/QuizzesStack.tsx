import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../utils/constant';
import QuizList from '../screens/QuizList';
import AttemptQuiz from '../screens/AttemptQuiz';

const QuizStack = createNativeStackNavigator();

const QuizStackScreen = () => (
  <QuizStack.Navigator screenOptions={{headerShown: false}}>
    <QuizStack.Screen name={screens.quizList} component={QuizList} />
    <QuizStack.Screen name={screens.viewQuiz} component={AttemptQuiz} />
  </QuizStack.Navigator>
);

export default QuizStackScreen;
