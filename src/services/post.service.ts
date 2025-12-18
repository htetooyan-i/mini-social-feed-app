import { query, orderBy, addDoc, collection, doc, deleteDoc, updateDoc, onSnapshot, serverTimestamp} from "firebase/firestore";

import { PostFormData } from "../models/Post";
import { Post } from "../models/Post";
import { auth, db } from "./firebase";
import { deleteImages } from "./storage.service";

// enusre user is logged in then create a new post in firebase
//
export const createPost = async (post: PostFormData) => {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await addDoc(collection(db, "posts"), {
    title: post.title,
    body: post.body,
    images: post.images,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

};

// delete post from firebase and also delete images from storage
//
export const deletePostWithImages = async (post: Post) => {
  
    await deleteDoc(doc(db, "posts", post.id));

  if (post.images?.length) {
    try {
      await deleteImages(post.images);
    } catch (e) {
      console.warn("Failed to delete images", e);
    }
  }

}

// update post in firebase
//
export const updatePost = async (postId: string, data: PostFormData) => {
    return await updateDoc(doc(db, 'posts', postId), data as Partial<Record<string, any>>);
}

// listener for posts in firebase database
//
export function subscribeToPosts( onPostsChange: (posts: Post[]) => void ) {
  
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const posts: Post[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          images: data.images ?? [],
        } as Post;
      });

      onPostsChange(posts);
    });

    // TODO: Need to reuse this if all posts have images field
    //
    // return onSnapshot(q, (snapshot) => {
    //     const posts: Post[] = snapshot.docs.map((doc) => ({
          
    //     id: doc.id,
    //     ...(doc.data() as Omit<Post, "id">),
    //     images: doc.data().images ?? [],
    //     }));

    //     onPostsChange(posts);
    // });

}
