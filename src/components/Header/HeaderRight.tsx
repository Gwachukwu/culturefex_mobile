import {TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {screens} from '../../utils/constant';
import {styles} from './styles';

const HeaderRight = ({navigation}: {navigation: any}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(screens.profile)}>
      <IonIcons name="person-outline" size={30} style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

export default HeaderRight;
