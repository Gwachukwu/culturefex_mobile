import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles/colors';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // Optional custom style for the button container
  textStyle?: StyleProp<TextStyle>; // Optional custom style for the button text
  loading?: boolean; // Loading state
  disabled?: boolean; // Disabled state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={!loading && !disabled ? onPress : undefined} // Disable onPress when loading or disabled
      style={[
        styles.button,
        style,
        (loading || disabled) && styles.buttonDisabled, // Apply disabled style
      ]}
      disabled={loading || disabled} // Disable interactions when loading or disabled
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} /> // Show loading indicator
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary, // Secondary color
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(66, 18, 113, 0.7)', // Disabled background color
  },
  text: {
    color: colors.primary, // Primary color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
