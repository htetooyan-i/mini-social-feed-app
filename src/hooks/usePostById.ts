import { usePosts } from "./usePosts";
import { Post } from "../models/Post";

export function usePostById(postId: string): Post | undefined {

    const { posts } = usePosts();
    return posts.find(post => post.id === postId);
    
}