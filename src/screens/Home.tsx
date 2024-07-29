import React from 'react';
import {StyleSheet, View} from 'react-native';
import {screens} from '../utils/constant';
import Tile from '../components/Tile';

const Home = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
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
      <Tile
        name="Create Game"
        onPress={() => navigation.navigate(screens.createQuiz)}
        backgroundImage={require('../assets/create_quiz.png')}
      />
      <Tile
        name="Create Recipie"
        onPress={() => navigation.navigate(screens.createRecipe)}
        backgroundImage={require('../assets/create_recipes.png')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 100,
    paddingBottom: 150,
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
});
