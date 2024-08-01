import React, { FC } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

// Extend TextInputProps to include all built-in TextInput props
interface TextAreaProps extends TextInputProps {
  label: string;
  containerStyle?: object; // Optional style for container
  textareaStyle?: object; // Optional style for TextInput
  value: string; // The value of the TextInput
  onChangeText: (text: string) => void; // Callback to handle text changes
}

const TextArea: FC<TextAreaProps> = ({
  label,
  containerStyle,
  textareaStyle,
  value,
  onChangeText,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.textarea, textareaStyle]}
        multiline
        numberOfLines={4}
        textAlignVertical="top" // Ensures text starts at the top of the textarea
        value={value} // Controlled value
        onChangeText={onChangeText} // Controlled callback
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.secondary,
    fontFamily: fonts.InterExtraBold,
  },
  textarea: {
    height: 100,
    borderRadius: 2,
    backgroundColor: colors.neutral,
    color: 'black', // Fixed typo from 'balck' to 'black'
    marginBottom: 12,
    paddingHorizontal: 5,
  },
});

export default TextArea;
