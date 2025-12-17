import { StyleSheet, View, SafeAreaView, Text, FlatList, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from '../components/Button';
import { darkColors, lightColors } from "../constants/colors";
import PostCard from "../components/PostCard";  
import { HomeParamList } from "../navigations/types";
import { usePosts } from "../hooks/usePosts";
import { useSystemTheme } from "../hooks/useSystemTheme";

type Props = NativeStackScreenProps<HomeParamList, 'Feed'>;

function FeedScreen({ navigation }: Props) {

    {/* use posts state */}
    const { posts } = usePosts();

    {/* Check scheme and set color set */}
    const scheme = useSystemTheme();
    const COLORS = scheme === 'dark' ? darkColors : lightColors;

    return (
        <SafeAreaView style={[styles.screen_container, { backgroundColor: COLORS.background}]}>
            {/* Header Section */}
            <View style={[styles.header_container, { backgroundColor: COLORS.primary}]}>
                <Text style={[styles.app_title, { color: COLORS.text}]}>Social App</Text>
                <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
            </View>

            {/* Content Section */}
            <FlatList
                style={[styles.content_container]}
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <PostCard post={item}/>
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

    header_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    screen_container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    // text styles
    
    app_title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    
})

export default FeedScreen;