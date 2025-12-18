import { Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function useImagePicker() {

    const [, requestPermission] = ImagePicker.useCameraPermissions();

    const pickFromLibrary = async (): Promise<string | null> => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        // throw if use doesn't allow permission
        if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library is required.');
        return null;
        }

        // open library and wait for image select
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }

        return null;
    };

    const takePhoto = async (): Promise<string | null> => {
        
        const permissionResult = await requestPermission();
        
        // throw if use doesn't allow permission
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the camera is required.');
            return null;
        }

        // open library and wait for the use to take iamge
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
        })

        if (!result.canceled) {
            return result.assets[0].uri
        }

        return null;
        
    }

    return { pickFromLibrary, takePhoto };
}
