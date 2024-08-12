import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import {quizzesRef} from '../firebase';
import {getDocs} from 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {screens} from '../utils/constant';
import QuizListItem from '../components/QuizListItem';

const QuizList = () => {
  const navigation = useNavigation<any>();

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(quizzesRef);
      const quizzesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          questions: data.questions,
        };
      });
      setQuizzes(quizzesData);
    } catch (e) {
      setError('Error fetching quizzes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Quiz List</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.createQuiz)}>
            <IonIcons
              name="add-circle-outline"
              size={36}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      }
      data={quizzes}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <QuizListItem item={item} navigation={navigation} />
      )}
      ListEmptyComponent={
        !loading && !error ? (
          <Text style={styles.empty}>No quiz found</Text>
        ) : null
      }
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : null
      }
    />
  );
};

export default QuizList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 24,
    paddingVertical: 10,
    color: colors.secondary,
    textAlign: 'center',
  },
  empty: {
    color: 'gray',
    textAlign: 'center',
    marginVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
