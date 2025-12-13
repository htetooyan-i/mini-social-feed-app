import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/Button'
import COLORS from '../constants/colors';
import { RootStackParamList } from '../navigations/types';
import { usePosts } from "../context/PostContext";

type Props = NativeStackScreenProps<RootStackParamList, 'CreatePost'>

function CreatePostScreen({ navigation }: Props) {

    {/* Get addPost from usePosts hook */}
    const { addPost } = usePosts();

    {/* Form State */}
    const [title, onChangeTitle] = React.useState('');
    const [body, onChangeBody] = React.useState('');

    {/* Handle Create Post */}
    const handleCreatePost = () => {
        addPost({
            id: Math.random(),
            title: title,
            body: body,
        });

        navigation.goBack();
    };

    return (
        <View style={styles.form_container}>
            
            <TextInput placeholder="Post Title" onChangeText={onChangeTitle} value={title} style={styles.input_field}/>
            <TextInput placeholder="Post Body" onChangeText={onChangeBody} value={body}  multiline={true} numberOfLines={4} style={[styles.input_field, styles.body_input_field]}/>

            <Button title="Submit Post" onPress={handleCreatePost} />
        </View>
    );
}

const styles = StyleSheet.create({

    // Component styles

    body_input_field: {
        height: 100,
        textAlignVertical: 'top',
    },

    form_container: {
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.borderPrimary,
        borderRadius: 10,
        margin: 20,
    },

    input_field: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderSecondary,
        marginBottom: 15,
        fontSize: 16,
        paddingVertical: 5,
    },


})

export default CreatePostScreen;