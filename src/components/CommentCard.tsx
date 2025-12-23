import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Comment } from "../models/Comment"
import { useSystemTheme } from '../hooks/useSystemTheme';
import { darkColors, lightColors } from '../constants/colors';

type CommentCardProps = {
    comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {

    // set theme COLORS
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors
    
    return (
        <View style={[styles.comment_card, {borderBottomColor: COLORS.borderSecondary}]}>
            <Text>{comment.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    comment_card: {
        margin: 10,
        padding: 10,
        borderBottomWidth: 2,
    },
});

export default CommentCard;