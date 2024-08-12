import {StyleSheet, Text, ScrollView, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import Input from '../components/Input/Input';
import ImagePicker from '../components/ImagePicker';
import TextArea from '../components/Textarea';
import CustomButton from '../components/CustomButton';
import Select from '../components/Select';
import {addDoc} from 'firebase/firestore';
import {recipesRef} from '../firebase';
import {AuthContext} from '../context/AuthContext';
import { IRecipe } from '../interfaces/recipes';

const initialState = {
  name: '',
  country: '',
  image: '',
  ingredients: [],
  procedure: '',
};
const CreateRecipe = () => {
  const {user} = useContext(AuthContext);

  const [recipe, setRecipe] = useState<IRecipe>(initialState);
  const [countries, setCountries] = useState<{label: string; value: string}[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data
          .map((country: any) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a: {label: string}, b: {label: string}) =>
            a.label.localeCompare(b.label),
          );
        setCountries(countryNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (name: string) => (text: string) => {
    if (name === 'ingredients') {
      const arr = text.split(',');
      setRecipe(prevData => ({...prevData, [name]: arr}));
    } else {
      setRecipe(prevData => ({...prevData, [name]: text}));
    }
  };

  const isButtonDisabled =
    loading ||
    Object.values(recipe).some(value => {
      if (Array.isArray(value)) {
        return value.length < 1;
      } else {
        return !value;
      }
    });

  const handleCreate = async () => {
    setLoading(true);
    try {
      if (user) {
        await addDoc(recipesRef, {
          ...recipe,
          userId: user?.uid,
        });
        Alert.alert('Successful', 'Recipe added');
        setRecipe(initialState);
      } else {
        Alert.alert('error', 'User not authenticated, log in and try again');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create A New Recipe</Text>
      <Input
        label="Name"
        onChangeText={handleChange('name')}
        value={recipe.name}
      />
      <Select
        label="Country"
        value={recipe.country}
        items={countries}
        onValueChange={handleChange('country')}
      />
      <ImagePicker image={recipe.image} setImage={handleChange('image')} />
      <TextArea
        label="Ingredients"
        placeholder="Add ingredients separated by comma"
        onChangeText={handleChange('ingredients')}
        value={recipe.ingredients.join(',')}
      />
      <TextArea
        label="Procedure"
        placeholder="Type here"
        onChangeText={handleChange('procedure')}
        value={recipe.procedure}
      />
      <CustomButton
        text="Add Recipe"
        onPress={handleCreate}
        // disabled={isButtonDisabled}
        loading={loading}
      />
    </ScrollView>
  );
};

export default CreateRecipe;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 24,
    paddingTop:10,
    textAlign: 'center',
    color: colors.secondary,
  },
  textarea: {
    height: 'auto',
    backgroundColor: colors.neutral,
  },
});
