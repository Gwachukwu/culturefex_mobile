import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const QuizList = () => {
  return (
    <View style={styles.container}>
      <Text>This is the QuizList</Text>
    </View>
  );
};

export default QuizList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'yellow'
  },
});
