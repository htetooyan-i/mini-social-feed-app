import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import PostForm from '../components/PostForm';
import { HomeParamList } from '../navigations/types';
import { getAuthErrorMessage } from '../utils/authErrors';
import { updatePost } from '../services/post.service';
import { uploadImages, deleteImages } from '../services/storage.service';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<HomeParamList, 'EditPost'>

function EditPostScreen({ navigation, route }: Props) {

    const { post } = route.params;
    const { user } = useAuth();

    // ensure user is logged in filter new added images and only upload those images to storage and update database with new datas
    // delete removed images from storage
    const handleEditPost = async (data: {title: string, body: string, images: string[]}) => {

        if (!user) {
            Alert.alert(getAuthErrorMessage("auth/no-current-user"));
            return;
        }

        // filter existing images which won't be uploaded 
        //
        const existingImages = data.images.filter(img =>
            img.startsWith("https://")
        );

        // filter new images that would be uploaded to the storage
        //
        const newImages = data.images.filter(img =>
            img.startsWith("file://")
        );

        // upload new images to storage
        const uploadedImages = await uploadImages(user.uid, newImages);

        // final image uris that gonna stored in databse
        const finalImages = [...existingImages, ...uploadedImages];

        // update databse data
        //
        await updatePost(post.id, {
            title: data.title,
            body: data.body,
            images: finalImages
        });

        // find removed images
        const originalImages = post.images;
        const removedImages = originalImages.filter(
            img => !finalImages.includes(img)
        )

        await deleteImages(removedImages);

        // TODO:: Need to go back to profile tab instead of home tab
        navigation.goBack();
    };

    return (
        <PostForm initialValues={{title: post.title, body: post.body, images: post.images}} onSubmit={handleEditPost} submitLabel='Update Post' />
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

export default EditPostScreen;