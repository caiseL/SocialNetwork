import { Post } from "../models/PostSchema";

export class PostService {
    static async getAllPost() {
        try {
            const allPost = await Post.find({});
            return allPost;
        } catch (e) {
            console.log(`Couldn't fetch every post ${e}`);
        }
    }

    static async getPostById(postID: string) {
        try {
            const post = await Post.findById(postID);
            return post;
        } catch (e) {
            console.log(`Couldn't get that post ${e}`);
        }
    }

    static async createPost(data: { [key: string]: string }) {
        try {
            const newPost = new Post(data);
            const response = await newPost.save();
            return response;
        } catch (e) {
            throw e;
        }
    }

    static async deletePostById(postID: string) {
        try {
            const deletedPost = await Post.findOneAndDelete({
                _id: postID,
            });
            return deletedPost;
        } catch (e) {
            console.error(e);
        }
    }

    static async updatePostById(
        data: { [key: string]: string },
        postID: string
    ) {
        try {
            const updatedPost = await Post.findOneAndUpdate({
                _id: postID,
            });
            return updatedPost;
        } catch (e) {
            console.error(e);
        }
    }
}
