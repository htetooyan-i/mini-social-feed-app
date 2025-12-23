import React, { useEffect } from 'react';
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import PostCard from '../components/PostCard';
import { darkColors, lightColors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { logOut } from '../services/auth.service';
import { Post } from '../models/Post';
import { RootTabParamList } from "../navigations/types";
import { useSystemTheme } from '../hooks/useSystemTheme';
import { useAuth } from '../hooks/useAuth';
import { usePostsByUser } from '../hooks/usePostsByUser';

type Props = BottomTabScreenProps<RootTabParamList, 'Profile'>;

function ProfileScreen({ navigation }: Props) {

    // send to EditPostScreen
    //
    const handleEditPost = (post: Post) => {
        navigation.navigate('Home', {
            screen: "EditPost",
            params: {
                post,
                from: "Profile",
            },
        });
    }

    // navigate to CommentScreen
    const handleComments = (postid: string) => {
        navigation.navigate('Home', {
            screen: "Comments",
            params: { postid },
        });
    }

    const { user, loading } = useAuth();

    // set COLORS set
    const scheme = useSystemTheme();
    const COLORS = scheme === "dark" ? darkColors : lightColors;

    // get posts created by logged user
    const posts = usePostsByUser(user?.uid)

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
                <Button title="Log Out" onPress={() => logOut()} />
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