import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screens} from '../utils/constant';
import Tile from '../components/Tile';
import HorizontalRule from '../components/HorizontalRule';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../styles/fonts';

const Home = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionHeader}>PLAY</Text>
      <View style={styles.section}>
        <Tile
          name="Games"
          onPress={() => navigation.navigate(screens.quizList)}
          backgroundImage={require('../assets/quiz.jpg')}
        />
        <Tile
          name="Recipes"
          onPress={() => navigation.navigate(screens.recipeList)}
          backgroundImage={require('../assets/recipes.png')}
        />
      </View>
      <HorizontalRule />
      <Text style={styles.sectionHeader}>CREATE</Text>
      <View style={styles.section}>
        <Tile
          name="Add Game"
          onPress={() => navigation.navigate(screens.createQuiz)}
          backgroundImage={require('../assets/create_quiz.png')}
        />
        <Tile
          name="Add Recipe"
          onPress={() => navigation.navigate(screens.createRecipe)}
          backgroundImage={require('../assets/create_recipes.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 150,
    marginHorizontal: 5,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  sectionHeader: {
    fontFamily: fonts.InterExtraBold,
    marginLeft:35,
    fontSize: 20,
    marginTop:'auto',
    marginBottom:10
  },
});
