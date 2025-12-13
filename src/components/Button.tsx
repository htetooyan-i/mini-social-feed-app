import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

type Props = {
    title: string,
    onPress: () => void,
}

function Button({title, onPress}: Props) {
    return (
        <View>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,

    },

    buttonText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        textAlign: 'center',
    },
})

export default Button;