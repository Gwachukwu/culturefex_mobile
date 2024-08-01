import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../styles/fonts'
import { colors } from '../styles/colors'

const CreateQuiz = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.header}>Quizzes</Text>
    </ScrollView>
  )
}

export default CreateQuiz

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 24,
    paddingTop: 25,
    textAlign: 'center',
    color: colors.secondary,
  },
})