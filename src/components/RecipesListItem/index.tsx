import {StyleSheet} from 'react-native';
import React from 'react';
import {IDBRecipe} from '../../interfaces/recipes';
import {screens} from '../../utils/constant';
import Tile from '../Tile';

const RecipeListItem = ({
  item,
  navigation,
}: {
  item: IDBRecipe;
  navigation: any;
}) => {
  return (
    <Tile
      name={item.name}
      onPress={() => navigation.navigate(screens.viewRecipe, {recipe: item})}
      backgroundImage={item.image}
    />
  );
};

export default RecipeListItem;

const styles = StyleSheet.create({});
