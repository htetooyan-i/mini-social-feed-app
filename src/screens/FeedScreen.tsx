import { StyleSheet, View, SafeAreaView, Text, FlatList } from "react-native";

import Button from '../components/Button';
import PostCard from "../components/PostCard";   

function FeedScreen({ navigation, posts }: any) {
    return (
        <SafeAreaView style={styles.screen_container}>

            {/* Header Section */}
            <View style={styles.header_continer}>
                <Text style={styles.app_title}>Social App</Text>
                <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
            </View>

            {/* Content Section */}
            <FlatList
                style={styles.content_container}
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <PostCard title={item.title} body={item.body} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    // layout styles

    content_container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },

    header_continer: {
        backgroundColor: '#84e6caff',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    screen_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    // component styles

    creat_post_button: {
        backgroundColor: 'blue',
    },

    // text styles
    
    app_title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    
})

export default FeedScreen;