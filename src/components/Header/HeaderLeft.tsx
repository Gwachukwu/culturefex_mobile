import {Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {screens} from '../../utils/constant';
import {styles} from './styles';

const HeaderLeft = ({navigation}: {navigation: any}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(screens.home)}>
      <Image
        source={require('../../assets/app_icon.png')}
        style={styles.headerImage}
      />
    </TouchableWithoutFeedback>
  );
};

export default HeaderLeft;
