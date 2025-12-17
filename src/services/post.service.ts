import { query, orderBy, addDoc, collection, doc, deleteDoc, updateDoc, onSnapshot, serverTimestamp} from "firebase/firestore";

import { PostFormData } from "../models/Post";
import { auth, db } from "./firebase";
import { Post } from "../models/Post";

// create new post
//
export const createPost = async (post: PostFormData) => {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await addDoc(collection(db, "posts"), {
    title: post.title,
    body: post.body,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });

};

// delete post from firebase
//
export const deletePost = async (postId: string) => {
    return await deleteDoc(doc(db, 'posts', postId));
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
        const posts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
        }));

        onPostsChange(posts);
    });

}
