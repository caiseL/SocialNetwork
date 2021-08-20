import express from "express";
import { PostController } from "../controllers/postController";
import { returnPostIfExists } from "../validators/postsValidators/returnPostIfExists";

export class PostService {
    static async getPosts(req: express.Request, res: express.Response) {
        console.log(req.user.id);
        let posts = await PostController.getPosts();
        res.status(200).send({ posts: posts });
    }

    static async getPostById(req: express.Request, res: express.Response) {
        const postID = req.params.id;

        const { errors, post } = await returnPostIfExists(postID);
        if (errors) return res.status(400).send({ errors: errors });

        res.status(200).send({ post: post });
    }

    static async createPost(req: express.Request, res: express.Response) {
        const body = req.body;
        const file = req.file;
        let createdPost = await PostController.createPost(body);
        if (file) {
            //const profilePhotoURL = await returnURLFromPhoto(file, userID);
            await PostController.updatePostById(createdPost.id, {
                //profilePhoto: profilePhotoURL,
            });
        }
        res.status(201).send({ post: createdPost });
    }

    static async updatePostById(req: express.Request, res: express.Response) {
        const postID = req.params.id;
        const postInfo = req.body;
        console.log(postInfo);

        let updatedPost = PostController.updatePostById(postID, postInfo);

        res.status(200).send({ post: updatedPost });
    }

    static async deletePostById(req: express.Request, res: express.Response) {
        const postToDelete = req.params.id;

        const { errors, post } = await returnPostIfExists(postToDelete);
        if (errors) return res.status(400).send({ errors: errors });

        if (post?.media) {
            // Delete it, fuck it
        }

        await PostController.deletePostById(post?.id);

        res.status(200).send({ post: post });
    }
}
