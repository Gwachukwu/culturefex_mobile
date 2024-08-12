import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {screens} from '../../utils/constant';
import {colors} from '../../styles/colors';
import {IDBQuiz} from '../../interfaces/quizzes';

const QuizListItem = ({item, navigation}: {item: IDBQuiz; navigation: any}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screens.viewQuiz, {quiz: item})}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default QuizListItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
