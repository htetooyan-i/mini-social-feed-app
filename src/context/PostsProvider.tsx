import { createContext, useContext, useState } from "react";
import { Post } from "../models/Post";

type PostsContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
};

export const PostsContext = createContext<PostsContextType | null>(null);

{/* Create a posts provider that wrap the app */}
export function PostsProvider({ children } : { children: React.ReactNode}) {

  const [posts, setPosts] = useState<Post[]>([]);

  {/* add new post at index 0 to current posts array */}
  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
  
}
