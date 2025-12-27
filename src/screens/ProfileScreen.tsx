import React from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActionSheetIOS, Text, View, StyleSheet, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostCard from '../components/PostCard';
import { darkColors, lightColors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { deleteUserAccount, changePassword, logOut } from '../services/auth.service';
import { Post } from '../models/Post';
import { ProfileParamList, RootTabParamList } from "../navigations/types";
import { useSystemTheme } from '../hooks/useSystemTheme';
import { useAuth } from '../hooks/useAuth';
import { usePostsByUser } from '../hooks/usePostsByUser';

type Props = NativeStackScreenProps<ProfileParamList, 'ProfilePosts'>;

function ProfileScreen({ navigation }: Props) {

    const { user, loading } = useAuth();

    // set COLORS set
    const scheme = useSystemTheme();
    const COLORS = scheme === "dark" ? darkColors : lightColors;

    // get posts created by logged user
    const posts = usePostsByUser(user?.uid)

    // send to EditPostScreen
    //
    const handleEditPost = (post: Post) => {
        navigation.getParent()?.navigate('Home', {
            screen: "EditPost",
            params: {
                post,
                from: "Profile",
            },
        });
    }

    // navigate to CommentScreen
    const handleComments = (postid: string) => {
        navigation.getParent()?.navigate('Home', {
            screen: "Comments",
            params: { postid },
        });
    }

    // navigate to ChangePasswordScreen
    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    }

    const handleActionSheet = () => {
    
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Change Password', 'Log Out', 'Delete Account'],
                destructiveButtonIndex: 3,
                cancelButtonIndex: 0,
                userInterfaceStyle: scheme === 'dark' ? 'dark' : 'light',
            },

            async (buttonIndex) => {
                if (buttonIndex === 1) { // Change Password
                    handleChangePassword();
                } else if (buttonIndex === 2) { // Log Out
                    await logOut();
                } else if (buttonIndex === 3) { // Delete Account
                    Alert.prompt(
                        'Delete Account',
                        'Are you sure you want to delete your account? This action cannot be undone. Please enter your password to confirm.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: async (password?: string) => {
                                    if (user && user.email && password) {
                                        try {
                                            // call delete user account service
                                            await deleteUserAccount(user.email, password);
                                        } catch (error: any) {
                                            if (error.code === 'auth/wrong-password') {
                                                Alert.alert('Error', 'The password you entered is incorrect.');
                                            } else {
                                                Alert.alert('Error', 'An error occurred while deleting your account. Please try again later.');
                                            }
                                        }
                                    } else {
                                        Alert.alert('Error', 'User not found or password is empty.');
                                    }
                                },
                            },
                        ],
                        'secure-text'
                    );
                }
            }
        );
    }

    if (loading) { // show if loading
        return (
            <SafeAreaView style={styles.loading_container}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.screen_container}>

            {/* Header Section */}
            <View style={[styles.header_continer, { backgroundColor: COLORS.primary}]}>
                <Text style={[styles.app_title, { color: COLORS.text}]}>Social App</Text>

                <Pressable onPress={async () => handleActionSheet()}>
                    <Ionicons name="person-circle-outline" size={32} color={COLORS.text} />
                </Pressable>

            </View>

            {/* Show user info */}
            <Text style={[styles.header, {color: COLORS.text}]}>{ user ? user.email : "Underfind" }</Text>

            {/* User's posts */}
            { posts.length > 0 ? // show posts created by current user
                <FlatList
                    style={styles.posts_container}
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <PostCard post={item} onComments={handleComments} isEditable onEdit={handleEditPost}/>
                    )}
                />
                : // Show if there is no posts with current user id
                <View style={styles.empty_screen_container}>
                    <Ionicons name='search' size={50} style={{color: 'grey'}}/>
                    <Text style={{color: 'grey', fontSize: 40, fontWeight: 'bold' }}>No Posts</Text>
                </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    app_title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    empty_screen_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    
    header: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 20,
        paddingHorizontal: 10,
        textAlign: "right"

    },

    header_continer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    
    loading_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    
    posts_container: {
        flex: 1,
        width: "100%",
        padding: 20

    },

    screen_container: {
        flex: 1,
        justifyContent: "flex-start",

    }, 
})
export default ProfileScreen;