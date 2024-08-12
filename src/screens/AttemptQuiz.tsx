import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../interfaces/common';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import {shuffleArray} from '../utils/methods';
import CustomButton from '../components/CustomButton';
import {screens} from '../utils/constant';

type AttemptQuizRouteProp = RouteProp<RootStackParamList, 'AttemptQuiz'>;

interface IAnswer {
  chosenOptionIndex: null | number;
  isTrue: boolean;
}

interface IOption {
  option: string;
  isTrue: boolean;
}

const AttemptQuiz = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<AttemptQuizRouteProp>();
  const {quiz} = route.params;

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [options, setOptions] = useState<IOption[][]>([]);

  useEffect(() => {
    if (quiz && quiz.questions) {
      const answerArray = quiz.questions.map(() => ({
        chosenOptionIndex: null,
        isTrue: false,
      }));

      // Randomise options
      const optionsArray = quiz.questions.map(question =>
        shuffleArray(question.options),
      );

      setAnswers(answerArray);
      setOptions(optionsArray);
    }
  }, [quiz]);

  const handleSelect = (
    questionIndex: number,
    chosenOptionIndex: number,
    isTrue: boolean,
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {chosenOptionIndex, isTrue};
    setAnswers(newAnswers);
  };

  const onSubmit = () => {
    const correctOptionCount = answers.filter(a => a.isTrue).length;

    Alert.alert('Your Score', `${correctOptionCount}/${answers.length}`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate(screens.quizList),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{quiz.title}</Text>
      <View>
        {quiz.questions.map((question, index) => (
          <View style={styles.section} key={index}>
            <Text style={{color:colors.secondary}}>Question {index + 1}</Text>
            <Text style={styles.question}>{question.questionText}</Text>
            {options[index]?.map((option, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleSelect(index, i, option.isTrue)}>
                <Text
                  style={[
                    styles.option,
                    answers[index]?.chosenOptionIndex === i && styles.chosen,
                  ]}>
                  {option.option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <CustomButton text="Submit" onPress={onSubmit} />
    </ScrollView>
  );
};

export default AttemptQuiz;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 34,
    color: colors.secondary,
  },
  section: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.neutral,
  },
  question: {
    fontSize: 18,
    color: colors.secondary,
  },
  option: {
    fontSize: 16,
    color: colors.primary,
    padding: 5,
  },
  chosen: {
    backgroundColor: colors.neutral,
  },
});
