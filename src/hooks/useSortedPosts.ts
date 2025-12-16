import { usePosts } from "./usePosts";
import { Post } from "../models/Post";

type Order = 'asc' | 'dsc';

export function useSortedPosts(order: Order): Post[] {
  const { posts } = usePosts();

  return [...posts].sort((a, b) => {
    const timeA = a.createdAt.toDate().getTime();
    const timeB = b.createdAt.toDate().getTime();

    return order === "asc" ? timeA - timeB : timeB - timeA;
  });
}