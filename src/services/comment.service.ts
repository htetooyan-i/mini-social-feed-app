import { query, orderBy, addDoc, collection, doc, deleteDoc, updateDoc, onSnapshot, serverTimestamp, Query} from "firebase/firestore";


import { auth, db } from "./firebase";
import { Comment, CommentFormData } from "../models/Comment"
import { Post } from "../models/Post";

export const createComment = async (comment: CommentFormData) => {

    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    await addDoc(collection(db, 'comments'), {
        userId: user.uid,
        postId: comment.postId,
        body: comment.body,
        createdAt: serverTimestamp(),
    });

}

export const subscribeToComments = ( 
    q: Query,
    onCommentChange: (comments: Comment[]) => (void),
    onLoadingChange: (loading: boolean) => (void),
) => {

    return onSnapshot(q, (snapshot) => {
        const comments: Comment[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
            } as Comment;
        });

        onCommentChange(comments)
        onLoadingChange(false)
    })
  
}