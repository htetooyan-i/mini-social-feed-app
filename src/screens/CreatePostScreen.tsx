import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import PostForm from '../components/PostForm';
import { HomeParamList } from '../navigations/types';
import { PostFormData } from '../models/Post';
import { getAuthErrorMessage } from '../utils/authErrors';
import { usePosts } from "../hooks/usePosts";
import { uploadImages } from '../services/storage.service';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<HomeParamList, 'CreatePost'>

function CreatePostScreen({ navigation }: Props) {

    // Get addPost from usePosts hook
    const { createPost } = usePosts();

    const { user } = useAuth();

    // ensure use is logged in, carete new post using data in params and upload images to storage
    const handleCreatePost = async (data: {title: string, body: string, images: string[]}) => {

        if (!user) {
            Alert.alert(getAuthErrorMessage("auth/no-current-user"));
            return;
        }

        const uris = await uploadImages(user.uid, data.images);

        const post: PostFormData = {
            title: data.title,
            body: data.body,
            images: uris,
        };

        createPost(post);
        navigation.goBack();
    };

    return (
        <View>
            <PostForm onSubmit={handleCreatePost} submitLabel='Create Post' />
        </View>

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

export default CreatePostScreen;