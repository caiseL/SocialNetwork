import { Post } from "../models/PostSchema";

export class PostController {
    static async getPosts(): Promise<Post[]> {
        const allPost = await Post.find({});
        return allPost;
    }

    static async getPostById(postID: string): Promise<Post> {
        const post = await Post.findById(postID);
        return post!;
    }

    static async createPost(data: { [key: string]: string }): Promise<Post> {
        const newPost = await new Post(data).save();
        return newPost;
    }

    static async deletePostById(postID: string): Promise<void> {
        await Post.findOneAndDelete({
            _id: postID,
        });
    }

    static async updatePostById(
        postID: string,
        postInfo: { [key: string]: string }
    ) {
        if (postInfo.media) {
            // Checar foto o video, blah,lba,lh,alb,hlah
        }
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postID,
            },
            postInfo,
            { new: true }
        );
        return updatedPost;
    }
}
