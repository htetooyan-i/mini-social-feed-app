import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import CreatePostScreen from "../screens/CreatePostScreen";
import EditPostScreen from "../screens/EditPostScreen"
import FeedScreen from "../screens/FeedScreen";
import { HomeParamList } from "./types";

// initalize stack and tab navigators
//
const Stack = createNativeStackNavigator<HomeParamList>();

// screen options for feed screen
//
const FeedOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

// screen options for createPost screen
//
const CreatePostOptions: NativeStackNavigationOptions = {
  title: 'Create Post',
  presentation: 'card',
  headerBackButtonDisplayMode: 'minimal',
};

// screen options for EditPost screen
//
const EditPostOptions: NativeStackNavigationOptions = {
  title: 'Edit Post',
  presentation: 'card',
  headerBackButtonDisplayMode: 'minimal',
};

function HomeTabNavigator() {

  return (
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="Feed" component={FeedScreen} options={FeedOptions} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={CreatePostOptions} />
        <Stack.Screen name="EditPost" component={EditPostScreen} options={EditPostOptions} />
      </Stack.Navigator>
  );
}

export default HomeTabNavigator;