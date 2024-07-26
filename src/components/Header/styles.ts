import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: colors.neutral,
        color: colors.secondary,
        borderRadius: 20, // Half of width and height to make it a circle
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    headerImage: {
        height: 40,
        resizeMode: 'contain',
    },
})