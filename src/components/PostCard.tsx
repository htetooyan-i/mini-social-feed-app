import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PostCardProps = {
    title: string,
    body: string,
}

function PostCard({title, body}: PostCardProps) {
    return (
        <View style={styles.post_card}>

            {/* Post Title */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>{ title }</Text>

            {/* Post Body */}
            <Text style={{fontSize: 16}}>{ body }</Text>

        </View>
    );
}

const styles = StyleSheet.create({

    post_card: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
})

export default PostCard;