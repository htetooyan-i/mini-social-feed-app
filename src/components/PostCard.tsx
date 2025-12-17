import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { darkColors, lightColors} from '../constants/colors';
import { useSystemTheme } from "../hooks/useSystemTheme";
import Button from './Button';
import { deletePost } from '../services/post.service';
import { Post } from '../models/Post';

type PostCardProps = {
    post: Post
    isEditable?: boolean
    onEdit?: (post: Post) => void
}

function PostCard({post, isEditable = false, onEdit}: PostCardProps) {


    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
        <View style={[styles.post_card, { borderColor: COLORS.borderPrimary}]}>

            {/* Post Title */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: COLORS.text}}>{ post.title }</Text>

            {/* Post Body */}
            <Text style={{fontSize: 16, color: COLORS.text}}>{ post.body }</Text>

            {/* Action Buttons */}
            {isEditable && onEdit && (
            <View style={styles.action_buttons}>
                <Button title="Edit" onPress={() => onEdit(post)} />
                <Button title="DELETE" onPress={() => deletePost(post.id)} />
            </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    action_buttons: {
        marginTop: 40,
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
    },

    post_card: {
        flex: 1,
        alignContent: "flex-end",
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
})

export default PostCard;