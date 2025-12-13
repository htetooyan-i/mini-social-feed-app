import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from "./types";
import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const FeedOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const CreatePostOptions: NativeStackNavigationOptions = {
  title: 'Create Post',
  presentation: 'card',
  headerBackButtonDisplayMode: 'minimal',
};

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Feed">
                <Stack.Screen name="Feed" component={FeedScreen} options={FeedOptions} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} options={CreatePostOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;