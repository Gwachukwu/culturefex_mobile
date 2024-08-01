import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Recipes from '../screens/Recipes';
import {screens} from '../utils/constant';
import ViewRecipe from '../screens/ViewRecipe';

// Create a stack navigator for Recipe details
const RecipeStack = createNativeStackNavigator();

const RecipeStackScreen = () => (
  <RecipeStack.Navigator screenOptions={{headerShown: false}}>
    <RecipeStack.Screen name={screens.recipeList} component={Recipes} />
    <RecipeStack.Screen name={screens.viewRecipe} component={ViewRecipe} />
  </RecipeStack.Navigator>
);

export default RecipeStackScreen;
