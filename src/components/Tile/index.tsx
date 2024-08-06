import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';

interface TileProps {
  name: string;
  iconName?: string;
  backgroundImage?: ImageSourcePropType | string; // Support both require() and base64
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Tile: React.FC<TileProps> = ({ name, iconName, backgroundImage, onPress, style }) => {
  // Determine the source based on the type of backgroundImage prop
  const backgroundImageSource = typeof backgroundImage === 'string' 
    ? { uri: `data:image/jpeg;base64,${backgroundImage}` }
    : backgroundImage;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.tile, style]} onPress={onPress}>
        {backgroundImageSource ? (
          <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} imageStyle={{ borderRadius: 10 }}>
            {/* Empty ImageBackground to render the background image */}
          </ImageBackground>
        ) : (
          <View style={styles.content}>
            {iconName && <Icon name={iconName} size={30} color="#000" />}
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  tile: {
    width: 150,
    height: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default Tile;
