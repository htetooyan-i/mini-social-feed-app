import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthForm  from '../components/AuthForm';
import { darkColors, lightColors } from '../constants/colors';
import { useSystemTheme } from '../hooks/useSystemTheme';
import Button from '../components/Button';
import { AuthParamList } from '../navigations/types';

type Props = NativeStackScreenProps<AuthParamList, 'Auth'>;

function AuthScreen({ navigation }: Props) {

    {/* set theme */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    const handleResetPassword = () => {
        navigation.navigate('ResetPassword')
    }

    return (
        <SafeAreaView>

            {/* Header Section */}
            <View style={[styles.header_continer, { backgroundColor: COLORS.primary}]}>
                <Text style={[styles.app_title, { color: COLORS.text}]}>Social App</Text>
            </View>

            {/* Login and signup form */}
            <AuthForm />     

            {/* Reset Password */} 
            <Button title="Reset Password" onPress={handleResetPassword} />

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