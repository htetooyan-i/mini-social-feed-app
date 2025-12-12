import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import CreatePostScreen from './src/screens/CreatePostScreen';
import FeedScreen from './src/screens/FeedScreen';
import { Post } from './src/types/Post';

const Stack = createNativeStackNavigator();

const FeedOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const CreatePostOptions: NativeStackNavigationOptions = {
  title: 'Create Post',
  presentation: 'card',
  headerBackButtonDisplayMode: 'minimal',
};

export default function App() {

  {/* Posts State */}
  const [posts, setPosts] = React.useState<Post[]>([]);

  {/* Add Post Handler */}
  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">

        <Stack.Screen name="Feed" options={FeedOptions}>
          {props => <FeedScreen {...props} posts={posts}/>}
        </Stack.Screen>


        <Stack.Screen name="CreatePost" options={CreatePostOptions}>
          {props => <CreatePostScreen {...props} addPost={addPost}/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
