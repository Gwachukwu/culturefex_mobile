import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RecipeList = () => {
  return (
    <View style={styles.container}>
      <Text>This is the RecipeList</Text>
    </View>
  )
}

export default RecipeList

const styles = StyleSheet.create({
  container:{
    flex:1
    // backgroundColor:'yellow'
  }
})