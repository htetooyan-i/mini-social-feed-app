import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { AuthParamList } from "./types";
import AuthScreen from "../screens/AuthScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator<AuthParamList>();

const authOptions: NativeStackNavigationOptions = {
    headerShown: false
}

const resetPasswordOptions: NativeStackNavigationOptions = {
    presentation: "formSheet",
    sheetAllowedDetents: "fitToContents",
    sheetGrabberVisible: true,
    headerShown: false,
}

function AuthNavigator() {

    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={authOptions}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={resetPasswordOptions}/>
        </Stack.Navigator>
    );

}

export default AuthNavigator