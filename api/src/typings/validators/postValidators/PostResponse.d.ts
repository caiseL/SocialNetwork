import { Post } from "../../../models/PostSchema";

export interface PostResponse {
    errors?: { error: string; message: string }[];
    post?: Post;
}
