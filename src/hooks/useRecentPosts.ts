import { usePosts } from "./usePosts";
import { Post } from "../models/Post";

export function useRecentPosts(days: number): Post[] {
  const { posts } = usePosts();
  return posts.filter(post => isWithinDays(post.createdAt.toDate(), days));
}

function isWithinDays(date: Date, days: number): boolean {
  const diffMs = Date.now() - date.getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}