import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/Button';
import CommentCard from '../components/CommentCard';
import PostCard from '../components/PostCard';
import { CommentFormData } from '../models/Comment';
import { darkColors, lightColors } from '../constants/colors';
import { HomeParamList } from '../navigations/types';
import { useSystemTheme } from '../hooks/useSystemTheme';
import { usePostById } from '../hooks/usePostById';
import { createComment } from '../services/comment.service';
import { getAuthErrorMessage } from '../utils/authErrors';
import { useComments } from '../hooks/useComments';

type Props = NativeStackScreenProps<HomeParamList, 'Comments'>;

function CommentScreen({ navigation, route }: Props) {

    // get post data
    const { postid } = route.params;
    const post = usePostById(postid as string);

    // fetch comments
    const { comments, loading } = useComments(postid as string);

    // Check scheme and set color set
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    // new comment input handler
    const [ comment, setComment ] = useState("");

    // Handle create comment
    const handleCreateComment = async () => {
        if (!comment.trim()) return;
        
        try {
            
            const commentData: CommentFormData = {
                postId: postid as string,
                body: comment,
            };
      
            await createComment(commentData);
      
            setComment("");
            Keyboard.dismiss();

        } catch (error) {
            const errorMessage = getAuthErrorMessage(error);
            Alert.alert("Failed to create comment:", errorMessage);
        }
    };
      

    return (
        <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
        >
            {
                !loading && (
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CommentCard comment={item} />
                    )}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListHeaderComponent={
                        <>
                            <View style={styles.post_container}>
                                {post && <PostCard post={post} />}
                            </View>
                            <Text style={{ padding: 20, fontWeight: '600', fontSize: 23, color: COLORS.text }}>Comments</Text>
                        </>
                        }
                        // Show when there is no comments
                        ListEmptyComponent={
                            <Text
                              style={{
                                textAlign: 'center',
                                padding: 40,
                                fontSize: 18,
                                color: '#999',
                              }}
                            >
                              No comments yet
                            </Text>
                        }
                    />
                )
            }

            {/* Fixed input bar */}
            <View style={styles.comment_container}>
                <TextInput
                onChangeText={setComment}
                value={comment}
                placeholder="Add Comment"
                style={[styles.comment_input, { borderColor: COLORS.borderPrimary, color: COLORS.text }]}
                />
                <Button title="Add Comment" onPress={() => handleCreateComment()}/>
            </View>
       </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    post_container: {
        padding: 20,
    },

    comment_container: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    comment_input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    comments_container: {
        flex: 1,
        padding: 20,
    },

    scroll: {
        flex: 1,
    },

    scroll_content: {
        padding: 20,
        paddingBottom: 80,
    },
});

export default CommentScreen;