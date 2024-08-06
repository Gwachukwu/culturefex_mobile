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
import {recipesRef} from '../firebase';
import {getDocs} from 'firebase/firestore';
import {IDBRecipe} from '../interfaces/recipes';
import RecipeListItem from '../components/RecipesListItem';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {screens} from '../utils/constant';

const Recipes = () => {
  const navigation = useNavigation<any>();

  const [recipes, setRecipes] = useState<IDBRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(recipesRef);
      const recipesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          country: data.country,
          image: data.image,
          ingredients: data.ingredients,
          procedure: data.procedure,
        };
      });
      setRecipes(recipesData);
    } catch (e) {
      setError('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Recipes</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.createRecipe)}>
            <IonIcons
              name="add-circle-outline"
              size={36}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      }
      data={recipes}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.gridItem}>
          <RecipeListItem item={item} navigation={navigation} />
        </View>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={
        !loading && !error ? (
          <Text style={styles.empty}>No recipes found</Text>
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

export default Recipes;

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
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 5,
    maxWidth: '48%',
  },
});
