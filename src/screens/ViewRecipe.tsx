import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../interfaces/recipes';
import {colors} from '../styles/colors';
import {fonts} from '../styles/fonts';

type ViewRecipeRouteProp = RouteProp<RootStackParamList, 'ViewRecipe'>;
const ViewRecipe = () => {
  const route = useRoute<ViewRecipeRouteProp>();
  const {recipe} = route.params;

  const {width} = Dimensions.get('window');
  const aspectRatio = 16 / 9; // Example aspect ratio, adjust as needed

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: `data:image/png;base64,${recipe.image}`}}
        style={[styles.image, {height: width / aspectRatio}]} // Adjust height as needed
        resizeMode="cover" // Adjust resizeMode as needed
      />
      <View style={styles.headers}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={[styles.name, styles.country]}>{recipe.country}</Text>
      </View>
      <Text style={[styles.name, styles.sectionheader]}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>{ingredient}</Text>
        </View>
      ))}
      <Text style={[styles.name, styles.sectionheader]}>Procedure</Text>
      <Text style={styles.itemText}>{recipe.procedure}</Text>
    </ScrollView>
  );
};

export default ViewRecipe;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    paddingBottom: 50,
  },
  image: {
    width: '100%', // Makes the image width fluid to the container's width
  },
  headers: {
    paddingTop: 20,
  },
  name: {
    textAlign: 'center',
    color: colors.secondary,
    fontFamily: fonts.InterExtraBold,
    fontSize: 28,
  },
  country: {
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 18,
    color: colors.secondary,
    marginRight: 8,
  },
  itemText: {
    fontSize: 18,
    color: colors.secondary,
  },
  sectionheader: {
    textAlign: 'left',
    fontSize: 18,
    paddingTop: 15,
  },
});
