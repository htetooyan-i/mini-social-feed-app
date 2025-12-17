import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeParamList } from '../navigations/types';
import { usePosts } from "../hooks/usePosts";
import { PostFormData } from '../models/Post';
import { useAuth } from '../hooks/useAuth';
import PostForm from '../components/PostForm';

type Props = NativeStackScreenProps<HomeParamList, 'CreatePost'>

function CreatePostScreen({ navigation }: Props) {

    {/* Get addPost from usePosts hook */}
    const { createPost } = usePosts();

    {/* Handle Create Post */}
    const handleCreatePost = (data: {title: string, body: string}) => {

        const post: PostFormData = {
            title: data.title,
            body: data.body,
        };

        createPost(post);
        navigation.goBack();
    };

    return (
        <PostForm onSubmit={handleCreatePost} submitLabel='Create Post' />
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
        borderRadius: 10,
        margin: 20,
    },

    input_field: {
        borderBottomWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        paddingVertical: 5,
    },


})

export default CreatePostScreen;