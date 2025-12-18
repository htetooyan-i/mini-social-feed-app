import { Timestamp, FieldValue } from "firebase/firestore";

export interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
    images: string[];
    createdAt: Timestamp;
}

export interface PostFormData {
  title: string;
  body: string;
  images: string[];
}

