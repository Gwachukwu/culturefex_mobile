import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

interface ImagePickerProps {
  image: string | null;
  setImage: (name: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({image, setImage}) => {
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const base64String = response.assets[0].base64;
        if (base64String) {
          setImage(base64String);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.button}>
        <FAIcon name="upload" style={styles.buttonText} />
        <Text style={styles.buttonText}>{image ? 'Change' : 'Add'} Image</Text>
      </TouchableOpacity>
      {image ? (
        <Image
          source={{uri: `data:image/jpeg;base64,${image}`}}
          style={styles.image}
        />
      ) : (
        <Text>No Image Selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: colors.neutral,
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  buttonText: {
    fontFamily: fonts.InterExtraBold,
    fontSize: 20,
  },
});

export default ImagePicker;
