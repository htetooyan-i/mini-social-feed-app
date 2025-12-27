import React from 'react';
import { StyleSheet, TextInput, View, Alert, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from '../components/Button';
import { changePassword } from '../services/auth.service';
import { darkColors, lightColors } from '../constants/colors';
import { getAuthErrorMessage } from '../utils/authErrors';
import { ProfileParamList } from '../navigations/types';
import { useSystemTheme } from '../hooks/useSystemTheme';

type ChangePasswordScreenProps = NativeStackScreenProps<ProfileParamList, 'ChangePassword'>;

function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {

    // Check scheme and set color set
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    const [ oldPassword, setOldPassword] = React.useState('');
    const [ newPassword, setNewPassword] = React.useState('');

    // change password
    const handleChangePassword = () => {
        changePassword(oldPassword, newPassword)
        .then(() => {
            Alert.alert('Success', 'Password changed successfully.');
            navigation.goBack();
        })
        .catch((error: any) => {
            const errorMessage = getAuthErrorMessage(error);
            Alert.alert('Error', errorMessage);
        });
    }

    // navigate to ResetPasswordScreen
    const handleResetPassword = () => { // TODO: fix to use another type of navigation this need two getParent() because this screen is in nested
        navigation
        .getParent()
        ?.getParent()
        ?.navigate('AuthStack', {
            screen: 'ResetPassword',
        });
    }

    return (
        <View style={[styles.form_container, { borderColor: COLORS.borderPrimary }]}>
    
            {/* Input fields */}
            <TextInput 
            placeholder="Old Password" 
            secureTextEntry
            autoCapitalize='none'
            onChangeText={setOldPassword}
            value={oldPassword}
            style={[styles.input_container, {borderColor: COLORS.borderSecondary, color: COLORS.text}]}
            />
            
            <TextInput 

            placeholder="New Password" 
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setNewPassword}
            value={newPassword}
            style={[styles.input_container, {borderColor: COLORS.borderSecondary, color: COLORS.text}]}
            />

            {/* TODO:: Cannot use reset password because if user id logged in we can't call the screen in auth stack */}
            {/* <Pressable onPress={() => handleResetPassword()} >
                <Text style={{marginVertical: 10, color: COLORS.text, textDecorationLine: 'underline'}}>Forgot password?</Text>
            </Pressable> */}


            <Button title="Change Password" onPress={() => handleChangePassword()} />
        </View>
    );
}

const styles = StyleSheet.create({

    form_container: {
        margin: 20,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,
    },
    
    input_container: {
        marginVertical: 20,
    },

});

export default ChangePasswordScreen;