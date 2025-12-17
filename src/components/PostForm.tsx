import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/Button'
import { darkColors, lightColors} from '../constants/colors';
import { useSystemTheme } from "../hooks/useSystemTheme";

type PostFormProps = {
  initialValues?: {
    title: string;
    body: string;
  };
  onSubmit: (data: { title: string; body: string }) => void;
  submitLabel: string;
};

function PostForm({
  initialValues = { title: "", body: "" },
  onSubmit,
  submitLabel,
}: PostFormProps) {

    const [title, setTitle] = useState(initialValues.title);
    const [body, setBody] = useState(initialValues.body);

    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
    
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

            <Button title={submitLabel} onPress={() => onSubmit({title, body})} />
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

export default PostForm;