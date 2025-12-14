import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { darkColors, lightColors} from '../constants/colors';
import { useSystemTheme } from "../hooks/useSystemTheme";

type PostCardProps = {
    title: string,
    body: string,
}

function PostCard({title, body}: PostCardProps) {


    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
        <View style={[styles.post_card, { borderColor: COLORS.borderPrimary}]}>

            {/* Post Title */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: COLORS.text}}>{ title }</Text>

            {/* Post Body */}
            <Text style={{fontSize: 16, color: COLORS.text}}>{ body }</Text>

        </View>
    );
}

const styles = StyleSheet.create({

    post_card: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
})

export default PostCard;