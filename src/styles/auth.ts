import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "./fonts";

export const authStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        color: colors.secondary,
    },
    logo: {
        marginTop: 60,
    },
    header: {
        fontFamily: fonts.InterExtraBold,
        fontSize: 40,
        color: colors.secondary,
        marginVertical: 15,
    },
    createText: {
        textAlign: "right",
        fontSize: 20,
        color: colors.secondary,
        fontWeight: "bold",
    },
    anotherPage:{
        marginTop:10
    }
});