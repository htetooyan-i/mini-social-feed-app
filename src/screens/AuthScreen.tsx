import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from "react-native";

import AuthForm  from '../components/AuthForm';
import { darkColors, lightColors } from '../constants/colors';
import { useSystemTheme } from '../hooks/useSystemTheme';

function AuthScreen() {

    {/* set theme */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;



    return (
        <SafeAreaView>

            {/* Header Section */}
            <View style={[styles.header_continer, { backgroundColor: COLORS.primary}]}>
                <Text style={[styles.app_title, { color: COLORS.text}]}>Social App</Text>
            </View>

            {/* Login and signup form */}
            <AuthForm />      

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    app_title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    header_continer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },


})

export default AuthScreen;