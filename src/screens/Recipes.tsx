import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import {recipesRef} from '../firebase';
import {getDocs} from 'firebase/firestore';
import {IDBRecipe} from '../interfaces/recipes';

const renderRecipe = ({item}: {item: any}) => <Text>{item.name}</Text>;

const Recipes = () => {
  const [recipes, setRecipes] = useState<IDBRecipe[]>();
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <View style={styles.listContainer}>
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {error && <Text style={styles.error}>{error}</Text>}
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={renderRecipe}
        />
      </View>
    </ScrollView>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 24,
    paddingTop: 10,
    color: colors.secondary,
  },
  listContainer: {
    flex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
});
