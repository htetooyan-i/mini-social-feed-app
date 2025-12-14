import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { darkColors, lightColors} from '../constants/colors';
import { useSystemTheme } from "../hooks/useSystemTheme";

type Props = {
    title: string,
    onPress: () => void,
}

function Button({title, onPress}: Props) {

    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
        <View>
            <Pressable style={[styles.button, { backgroundColor: COLORS.secondary}]} onPress={onPress}>
                <Text style={[styles.buttonText, { color: COLORS.text}]}>{title}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,

    },

    buttonText: {
        fontSize: 16,
        textAlign: 'center',
    },
})

export default Button;