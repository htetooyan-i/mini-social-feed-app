import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { createPost, subscribeToPosts } from "../services/post.service";
import { db } from "../services/firebase";
import { Post, PostFormData } from "../models/Post";


type PostsContextType = {
  posts: Post[];
  createPost: (post: PostFormData) => Promise<void>;
};

export const PostsContext = createContext<PostsContextType | null>(null);

{/* Create a posts provider that wrap the app */}
export function PostsProvider({ children } : { children: React.ReactNode}) {

  const [posts, setPosts] = useState<Post[]>([]);

  {/* take posts from fireabse and set to posts state */}
  const setPostsFromFirestore = (posts: Post[]) => {
    setPosts(posts);
  }
  
  {/* Listen to posts changes in firebase */}
  useEffect(() => {
    const unsubscribe = subscribeToPosts(setPostsFromFirestore);
    return unsubscribe;
  }, [])

  return (
    <PostsContext.Provider value={{ posts, createPost }}>
      {children}
    </PostsContext.Provider>
  );
  
}
