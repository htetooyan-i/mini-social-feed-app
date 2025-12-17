import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";

import AuthScreen from "../screens/AuthScreen";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "./types";
import TabsNavigator from "./TabsNavigator";

// initalize stack navigator
//
const Stack = createNativeStackNavigator<RootStackParamList>();

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
                  <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }}/>
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