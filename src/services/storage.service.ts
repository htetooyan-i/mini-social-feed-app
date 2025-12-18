import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { storage } from './firebase'

// Upload single image
// create file name using datetime and random numbers to get the unique file name
//
export async function saveImageInStorage(userId: string, uri: string): Promise<string> {

    const response = await fetch(uri)
    const blob = await response.blob();

    const imageRef = ref(storage, `posts/${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL
}

// Upload multiple images
//
export async function uploadImages(userId: string, uris: string[]): Promise<string[]> {

    const urls = await Promise.all(
        uris.map((uri) => saveImageInStorage(userId, uri))
    );

    return urls;
}

// Delete user removed images
//
export async function deleteImages(uris: string[]): Promise<void> {

    await Promise.all(
        uris.map( async (uri) => {
            const imageRef = ref(storage, uri);
            await deleteObject(imageRef)
        })
    ) 
}