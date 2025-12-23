import { useEffect, useState } from "react";
import { collection, orderBy, query, where } from "firebase/firestore";

import { Comment } from "../models/Comment";
import { db } from "../services/firebase";
import { subscribeToComments } from "../services/comment.service";

export function useComments(postId: string) {

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!postId) return;

    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = subscribeToComments(q, setComments, setLoading);
    return unsubscribe;

  }, [postId]);

  return { comments, loading };
}
