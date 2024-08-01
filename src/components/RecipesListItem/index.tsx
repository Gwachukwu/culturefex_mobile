import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IDBRecipe} from '../../interfaces/recipes';
import {colors} from '../../styles/colors';
import {screens} from '../../utils/constant';

const RecipeListItem = ({
  item,
  navigation,
}: {
  item: IDBRecipe;
  navigation: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screens.viewRecipe, {recipe: item})}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default RecipeListItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
