import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import { ProfileParamList } from "./types";

// initalize stack and tab navigators
const Stack = createNativeStackNavigator<ProfileParamList>();

// screen options for all screens under this navigator
const ProfileOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const ChangePasswordOptions: NativeStackNavigationOptions = {
  headerShown: true,
  title: 'Change Password',
  headerBackButtonDisplayMode: 'minimal',
};

function HomeTabNavigator() {

  return (
      <Stack.Navigator initialRouteName="ProfilePosts">
        <Stack.Screen name="ProfilePosts" component={ProfileScreen} options={ProfileOptions} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={ChangePasswordOptions} />
      </Stack.Navigator>
  );
}

export default HomeTabNavigator;