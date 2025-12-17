import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeParamList } from '../navigations/types';
import { updatePost } from '../services/post.service';
import PostForm from '../components/PostForm';

type Props = NativeStackScreenProps<HomeParamList, 'EditPost'>

function EditPost({ navigation, route }: Props) {

    const { post } = route.params;

    {/* Handle Update Post data in firebase */}
    const handleEditPost = (data: {title: string, body: string}) => {
        
        post.title = data.title;
        post.body = data.body;
        
        updatePost(post.id, post)
        navigation.goBack();
    };

    return (
        <PostForm initialValues={{title: post.title, body: post.body}} onSubmit={handleEditPost} submitLabel='Update Post' />
    );
}

const styles = StyleSheet.create({

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

export default EditPost;