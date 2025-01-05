import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import theme from "../../../theme";

interface InputTextProps {
    placeholder: string;
    value: string;
    title?: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    
}

export default function InputText({placeholder, value, title, onChangeText, secureTextEntry}:InputTextProps){
    return(
        <View>
            <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style = {styles.input}
            secureTextEntry = {secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        color: theme.colors.textPrimary,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    }
})