import { Timestamp, FieldValue } from "firebase/firestore";

export interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: Timestamp;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: string;
}

export interface UpdatePostData {
  title?: string;
  body?: string;
}

