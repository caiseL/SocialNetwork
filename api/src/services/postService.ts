import express from "express";
import { PostController } from "../controllers/postController";
import { returnURLFromPhoto } from "../utils/cloudinary/user/uploadUserPhoto";
import { createPostValidator } from "../validators/postsValidators/createPostValidator";
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
        const postInfo = req.body;
        const file = req.file;
        console.log(req.user.id);
        postInfo.postedBy = req.user.id;

        const { errors } = createPostValidator(postInfo);
        if (errors) return res.status(400).send({ errors: errors });

        let createdPost = await PostController.createPost(postInfo);
        if (file) {
            //* WIP
            // Piensa que aquí también puede ser un video, asi que a lo mejor tendrás que crear tu propio método
            const mediaPhotoURL = await returnURLFromPhoto(
                file,
                createdPost.id
            );
            await PostController.updatePostById(createdPost.id, {
                media: mediaPhotoURL,
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
