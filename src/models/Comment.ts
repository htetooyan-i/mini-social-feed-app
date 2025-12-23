import { Timestamp } from "firebase/firestore";

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    body: string;
    createdAt: Timestamp;
}

export interface CommentFormData {
    postId: string,
    body: string,
}