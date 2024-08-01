import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

interface SelectProps {
  label: string;
  items: {label: string; value: string}[];
  onValueChange: (value: string) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  items,
  onValueChange,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        style={pickerSelectStyles}
        placeholder={{label: 'Select an option', value: null}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: fonts.InterExtraBold,
    color: colors.secondary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: colors.neutral,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    backgroundColor: colors.neutral,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'gray'
  },
});

export default Select;
