import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Button from '../components/Button'

function CreatePostScreen({ navigation, addPost }: any) {

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
        color: 'black',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 20,
    },

    input_field: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 15,
        fontSize: 16,
        paddingVertical: 5,
    },


})

export default CreatePostScreen;