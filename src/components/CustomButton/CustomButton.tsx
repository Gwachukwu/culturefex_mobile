// CustomButton.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../../utils/constant";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // Optional custom style for the button container
  textStyle?: StyleProp<TextStyle>; // Optional custom style for the button text
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary, // Secondary color
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop:10
  },
  text: {
    color: colors.primary, // Primary color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
