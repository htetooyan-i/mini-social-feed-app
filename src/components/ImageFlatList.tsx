import React, { useState } from 'react';
import { FlatList, View, Image, Pressable, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ImageFlatListProps = {
    images: string[],
    removeImage?: (uri: string) => void,
    editable?: boolean
}

function ImageFlatList({images, removeImage = undefined, editable = false}: ImageFlatListProps) {

    // loading state for preivew image {# don't want to show the black screen}
    const [loading, setLoading] = useState(true);

    // state for preview image
    const [previewUri, setPreviewUri] = useState<string | null>(null);

    const handlePreview = (uri: string) => {
        setPreviewUri(uri);
    };

    const closePreview = () => {
        setPreviewUri(null);
    };

    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={images}
                keyExtractor={(uri) => uri}
                renderItem={({item}) => (

                    <View style={styles.imageWrapper}>
                        <Pressable onPress={() => handlePreview(item)}>
                            <Image source={{uri: item, cache: 'force-cache'}} style={styles.image} />
                        </Pressable>
                        {
                            editable && removeImage && (
                                <Pressable
                                    style={styles.removeIcon}
                                    onPress={() => removeImage(item)}
                                >
                                    <Ionicons name="close-circle" size={24} color="white" />
                                </Pressable>
                            )
                            
                        }
                    </View>
                )}
            />

            {/* Preview image */}
            <Modal visible={!!previewUri} transparent={true} animationType="fade">
                <Pressable style={styles.previewOverlay} onPress={closePreview}>
                    <Image
                    source={{ uri: previewUri!, cache: 'force-cache' }}
                    style={styles.previewImage}
                    resizeMode="contain"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    />

                    {loading && (
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}
                </Pressable>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        marginVertical: 20,
        marginHorizontal: 5,
        width: 100,
        height: 200,
        borderRadius: 20,
        resizeMode: "center"
    },

    imageWrapper: {
        position: "relative",
    },

    loader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -12 }, { translateY: -12 }],
    },

    previewOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },

    removeIcon: {
        position: "absolute",
        top: 25,
        right: 10,
        backgroundColor: "rgba(216, 22, 22, 0.92)",
        borderRadius: 12,
    },


})
export default ImageFlatList;