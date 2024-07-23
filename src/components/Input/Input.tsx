import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors, fonts } from "../../utils/constant";
import Icon from "react-native-vector-icons/Entypo";

// Extend the InputProps interface
interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label: string;
  isPassword?: boolean; // Add this prop to toggle password visibility
}

const Input: FC<InputProps> = ({
  value = "",
  onChangeText,
  placeholder = "Type here",
  label,
  isPassword = false, // Default to false if not provided
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword} // Conditionally apply secureTextEntry
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <Icon name="eye-with-line" size={24} color="black" style={styles.icon} />
            ) : (
              <Icon
                name="eye"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.secondary,
    fontFamily: fonts.InterExtraBold,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 45,
    flex: 1,
    marginBottom: 12,
    paddingHorizontal: 5,
    backgroundColor: colors.neutral,
    color:"black",
    borderRadius: 2,
  },
  toggleButton: {
    position: "absolute",
    top: "20%",
    right: "3%",
  },
  icon: {
    // width: 20,
    // height: 20,
  },
});

export default Input;
