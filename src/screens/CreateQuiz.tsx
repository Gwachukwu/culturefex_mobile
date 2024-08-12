import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import Input from '../components/Input/Input';
import {questionTemplate} from '../utils/constant';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';
import {quizzesRef} from '../firebase';
import {addDoc} from 'firebase/firestore';
import {areAllFieldsFilled} from '../utils/methods';
import { IQuiz } from '../interfaces/quizzes';

const initialState = {
  title: '',
  questions: Array(10)
    .fill(null)
    .map(() => ({...questionTemplate})),
};

const CreateQuiz = () => {
  const {user} = useContext(AuthContext);

  const [quiz, setQuiz] = useState<IQuiz>(initialState);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (title: string) => {
    setQuiz(prev => ({...prev, title}));
  };

  const handleQuestionChange = (index: number) => (question: string) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = {...newQuestions[index], questionText: question};
    setQuiz(prev => ({...prev, questions: newQuestions}));
  };

  const handleOptionChange =
    (questionIndex: number, optionIndex: number) => (option: string) => {
      const newQuestions = [...quiz.questions];

      const newOptions = [...newQuestions[questionIndex].options];

      newOptions[optionIndex] = {...newOptions[optionIndex], option};

      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions,
      };

      setQuiz(prev => ({...prev, questions: newQuestions}));
    };

  const handleCreate = async () => {
    setLoading(true);
    try {
      if (user) {
        await addDoc(quizzesRef, {
          ...quiz,
          userId: user?.uid,
        });
        Alert.alert('Successful', 'Quiz Created');
        setQuiz(initialState);
      } else {
        Alert.alert('error', 'User not authenticated, log in and try again');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Quiz</Text>
      <View style={{paddingBottom: 15}}>
        <View style={styles.section}>
          <Input
            label="Quiz Title"
            onChangeText={handleTitleChange}
            value={quiz.title}
          />
        </View>
        <View>
          {quiz.questions.map((question, index) => (
            <View style={styles.section} key={index}>
              <Input
                label={`Question ${index + 1}`}
                labelStyle={{fontSize: 16}}
                onChangeText={handleQuestionChange(index)}
                value={question.questionText}
              />
              {question.options.map((option, i) => {
                if (option.isTrue) {
                  return (
                    <Input
                      label="Correct Answer"
                      key={i}
                      labelStyle={styles.optionLabel}
                      onChangeText={handleOptionChange(index, i)}
                      value={option.option}
                    />
                  );
                } else {
                  return (
                    <Input
                      label={`False Option ${i}`}
                      key={i}
                      labelStyle={styles.optionLabel}
                      onChangeText={handleOptionChange(index, i)}
                      value={option.option}
                    />
                  );
                }
              })}
            </View>
          ))}
        </View>
      </View>
      <CustomButton
        text="Create"
        onPress={handleCreate}
        style={{marginBottom: 15}}
        disabled={loading || !areAllFieldsFilled(quiz)}
        loading={loading}
      />
    </ScrollView>
  );
};

export default CreateQuiz;

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
    borderBottomWidth: 2, // Width of the bottom border
    borderBottomColor: colors.neutral, // Color of the bottom border
  },
  optionLabel: {
    color: colors.primary,
    fontSize: 12,
  },
});
