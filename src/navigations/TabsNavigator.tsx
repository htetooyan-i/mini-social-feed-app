import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { RootTabParamList } from "./types";
import HomeTabNavigator from "./HomeNavigator";
import ProfileScreen from '../screens/ProfileScreen';
import { useSystemTheme } from '../hooks/useSystemTheme';
import { darkColors, lightColors } from '../constants/colors';
import { Platform } from 'react-native';

// initalize tab navigator
//
const Tab = createBottomTabNavigator<RootTabParamList>();

// tab bar options for all tabs
const tabBarOptions: BottomTabNavigationOptions = {
    tabBarPosition: Platform.OS === "ios" ? "bottom" : "top"
}

// TODO: need to change this when use native tab bar
// home tab bar options
//
const homeOptions: BottomTabNavigationOptions = {
    tabBarIcon: ({ focused, color, size }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={size}
        color={color}
      />
    ),
};

// TODO: need to change this when use native tab bar
// profile tab bar options
//
const profileOptions: BottomTabNavigationOptions = {
    tabBarIcon: ({ focused, color, size }) => (
      <Ionicons
        name={focused ? "person" : "person-outline"}
        size={size}
        color={color}
      />
    ),
};

function TabsNavigator() {

  {/* set COLORS set by system theme */}
  const scheme = useSystemTheme();
  const COLORS = scheme === "dark" ? darkColors : lightColors;

  return (
      <Tab.Navigator screenOptions={{
        ...tabBarOptions,
        tabBarActiveTintColor: COLORS.secondary,
        headerShown: false,
      }}>
          <Tab.Screen name="Home" component={HomeTabNavigator} options={homeOptions}/>
          <Tab.Screen name="Profile" component={ProfileScreen}  options={profileOptions}/>
      </Tab.Navigator>
  );
}

export default TabsNavigator;



