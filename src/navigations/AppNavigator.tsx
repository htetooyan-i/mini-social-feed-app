import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";

import AuthScreen from "../screens/AuthScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import FeedScreen from "../screens/FeedScreen";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

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

function AppNavigator() {

  {/* set theme */}
  const scheme = useColorScheme();
  const { user, loading } = useAuth();

  // is fire executing onAuthStateChanged UI won't change
  if (loading) return null;

  return (
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            {
              user ? ( // show if user is not null
                <>
                  <Stack.Screen name="Feed" component={FeedScreen} options={FeedOptions} />
                  <Stack.Screen name="CreatePost" component={CreatePostScreen} options={CreatePostOptions} />
                </>
                
              ) : ( // show if user hasn't logged in
                <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
              )
            }
              
              
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default AppNavigator;