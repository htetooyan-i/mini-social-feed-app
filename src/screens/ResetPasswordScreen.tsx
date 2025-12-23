import React, { useState } from "react";
import { StyleSheet, View, Alert, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from "../components/Button";
import { getAuthErrorMessage } from "../utils/authErrors";
import { resetPassword } from "../services/auth.service";
import { useSystemTheme } from "../hooks/useSystemTheme";
import { darkColors, lightColors } from "../constants/colors";
import { AuthParamList } from "../navigations/types";

type Props = NativeStackScreenProps<AuthParamList, 'ResetPassword'>;

function ResetPasswordScreen({ navigation }: Props) {

    // use email input state
    const [email, setEmail] = useState("");

    // set system theme
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;
    
    // reset password
    const handleReset = async () => {
      try {
        await resetPassword(email);
        setEmail("")
        navigation.goBack();
        Alert.alert("Password reset email sent");
      } catch (err) {
        Alert.alert(getAuthErrorMessage(err));
      }
    };
  
    return (
      <View style={[styles.container, { borderColor: COLORS.borderPrimary}]}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={[styles.input_container, {borderColor: COLORS.borderSecondary, color: COLORS.text}]}
        />
        <Button title="Send reset password link" onPress={handleReset} />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },

    input_container: {
        marginVertical: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginHorizontal: 20,
    }
})
export default ResetPasswordScreen