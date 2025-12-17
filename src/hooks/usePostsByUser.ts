import { useEffect } from "react";

import { usePosts } from "./usePosts";
import { Post } from "../models/Post";


export function usePostsByUser(userId?: string): Post[] {

  const { posts } = usePosts();

  if (!userId) {
    return [];
  }

  return posts.filter(post => post.userId === userId);
}
