import { usePosts } from "./usePosts";
import { Post } from "../models/Post";

export function usePostsByUser(userId: string): Post[] {
  const { posts } = usePosts();
  return posts.filter(post => post.userId === userId);
}
