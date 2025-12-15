import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from "react-native";

import { getAuthErrorMessage } from "../utils/authErrors";
import Button from '../components/Button';
import { darkColors, lightColors } from '../constants/colors';
import { useSystemTheme } from '../hooks/useSystemTheme';
import { signIn, signUp } from '../services/auth.service';

function AuthForm() {

    // set theme
    //
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');


    // handle user login print alert if any error
    //
    const handleLogin = async () => {
        try {
            await signIn(email, password)
        } catch(error: any) {
            const errorMessage = getAuthErrorMessage(error)
            Alert.alert(errorMessage)
        }
    }

    // handle user sign up print alert if any error
    //
    const handleSignUp = async () => {
        try {
            await signUp(email, password)
        } catch (error: any) {
            const errorMessage = getAuthErrorMessage(error)
            Alert.alert(errorMessage)
        }
    }
    return (
        <View style={[styles.form_container, { borderColor: COLORS.borderPrimary }]}>
        
            {/* Input fields */}
            <TextInput 
            placeholder="email" 
            autoCapitalize='none'
            onChangeText={setEmail}
            value={email}
            style={[styles.input_container, {borderColor: COLORS.borderSecondary, color: COLORS.text}]}
            />
            
            <TextInput 

            placeholder="password" 
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
            style={[styles.input_container, {borderColor: COLORS.borderSecondary, color: COLORS.text}]}
            />

            {/* Sign in and Sing up buttons */}
            <View style={styles.row}>
                <View style={styles.button}>
                    <Button title="Sign in" onPress={handleLogin} />
                </View>
                <View style={styles.button}>
                    <Button title="Sign up" onPress={handleSignUp} />
                </View>
            </View>
        </View>

        
    );
}

const styles = StyleSheet.create({

    button: {
        flex: 1,
        marginHorizontal: 5,
    },

    form_container: {
        margin: 20,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,
    },
    
    input_container: {
        marginVertical: 20,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },



})

export default AuthForm;