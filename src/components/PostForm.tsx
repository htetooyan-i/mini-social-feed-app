import React, { useState } from 'react';
import { View, Alert, TextInput, StyleSheet, ScrollView } from 'react-native';

import Button from '../components/Button'
import ImagePickerButton from './ImagePickerButton';
import ImageFlatList from './ImageFlatList';
import { darkColors, lightColors} from '../constants/colors';
import { useSystemTheme } from "../hooks/useSystemTheme";
import { useImagePicker } from '../hooks/useImagePicker';

type PostFormProps = {
  initialValues?: {
    title: string;
    body: string;
    images: string[];
  };
  onSubmit: (data: { title: string; body: string, images:string[] }) => Promise<void>;
  submitLabel: string;
};

function PostForm({
  initialValues = { title: "", body: "", images: [] },
  onSubmit,
  submitLabel,
}: PostFormProps) {

    // input states
    const [title, setTitle] = useState(initialValues.title);
    const [body, setBody] = useState(initialValues.body);
    const [images, setImages] = useState<string[]>(initialValues.images);

    // use to disable submit button while executing onSubmit func
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (submitting) return;

        try {
            setSubmitting(true);
            await onSubmit({ title, body, images });
        } catch (e) {
            Alert.alert("Error", "Failed to submit post");
        } finally {
            setSubmitting(false);
        }

    };

    // imagePicker hooks
    const { takePhoto, pickFromLibrary } = useImagePicker();

    // add new image to image state
    const addImage = (uri: string) => {
        setImages(prev => {
            if (prev.includes(uri)) return prev;
            return [...prev, uri];
        })
    }

    // remove image from image state
    const removeImage = (uri: string) => {
        setImages(prev => prev.filter(img => img !== uri));
    }

    // pick a image from library
    const handlePickImage = async () => {
        const uri = await pickFromLibrary();
        if (uri) addImage(uri);
    };

    // take a image using camera
    const handleTakeImage = async () => {
        const uri = await takePhoto();
        if (uri) addImage(uri);
    };



    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
    
        <ScrollView>
            <View style={[styles.form_container, { borderColor: COLORS.borderPrimary }]}>
                {/* Title input */}
                <TextInput 
                placeholder="Post Title" 
                onChangeText={setTitle} 
                value={title} 
                style={[
                    styles.input_field, 
                    { borderColor: COLORS.borderSecondary, color: COLORS.text}
                    ]}
                />
                
                {/* Body input */}
                <TextInput 

                placeholder="Post Body" 
                onChangeText={setBody} 
                value={body}  
                multiline={true} 
                numberOfLines={4} 
                style={[
                    styles.input_field, 
                    styles.body_input_field, 
                    { borderColor: COLORS.borderSecondary, color: COLORS.text }
                ]}
                />

                {/* Image Pickers */}
                <View style={styles.image_picker}>
                    <ImagePickerButton buttonLabel='Pick Image' onClick={handlePickImage}/>
                </View>

                <View style={styles.image_picker}>
                    <ImagePickerButton buttonLabel='Take Image' onClick={handleTakeImage}/>
                </View>

                {/* Display Selected images */}
                <ImageFlatList images={images} removeImage={removeImage} editable={true} />

                <Button title={submitLabel} onPress={handleSubmit} disabled={submitting}/>
            </View>
        </ScrollView>
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

    image_picker: {
        width: "40%",
        marginVertical: 20
    },

    input_field: {
        borderBottomWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        paddingVertical: 5,
    },


})

export default PostForm;

