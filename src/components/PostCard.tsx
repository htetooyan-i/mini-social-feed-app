import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';
import ImageFlatList from './ImageFlatList';
import { darkColors, lightColors} from '../constants/colors';
import { deletePostWithImages } from '../services/post.service';
import { Post } from '../models/Post';
import { useSystemTheme } from "../hooks/useSystemTheme";

type PostCardProps = {
    post: Post
    onComments?: (postid: string) => void
    isEditable?: boolean
    onEdit?: (post: Post) => void
}

function PostCard({post, onComments, isEditable = false, onEdit}: PostCardProps) {


    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
        <View style={[styles.post_card, { borderColor: COLORS.borderPrimary}]}>

            {/* Post Title */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: COLORS.text}}>{ post.title }</Text>

            {/* Post Body */}
            <Text style={{fontSize: 16, color: COLORS.text}}>{ post.body }</Text>

            {/* Media images and vidoes */}
            { 
                (post.images).length > 0 && 
                
                <ImageFlatList images={post.images} />
            }

            {/* Navigate to CommentScreen */}
            { onComments && (
                <View style={styles.comment_button}>
                    <Button title="Comments" onPress={() => onComments(post.id)} />
                </View>
            )}

            {/* Action Buttons */}
            {isEditable && onEdit && (
            <View style={styles.action_buttons}>
                <Button title="Edit" onPress={() => onEdit(post)} />
                <Button title="DELETE" onPress={() => deletePostWithImages(post)} />
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

    comment_button: {
        marginTop: 20,
        marginHorizontal: 5,
        width: "100%",
        alignSelf: "flex-end",
    },

    image: {
        marginTop: 20,
        marginHorizontal: 5,
        width: 100,
        height: 200,
        borderRadius: 20,
        resizeMode: "center"
    },

    media_container: {
        flex: 1,
        flexDirection: "row",
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