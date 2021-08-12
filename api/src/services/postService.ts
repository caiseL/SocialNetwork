import express from "express";
import { PostService } from "../controllers/postController";

const getPosts = async (req: express.Request, res: express.Response) => {
    let posts = await PostService.getAllPost();
    res.status(200).send({ posts: posts });
};

const getPostById = async (req: express.Request, res: express.Response) => {
    const requestID = req.params.id;
    let post = await PostService.getPostById(requestID);
    res.status(200).send({ post: post });
};

const deletePostById = (req: express.Request, res: express.Response) => {
    const postToDelete = req.params.id;
    let deletedPost = PostService.deletePostById(postToDelete);

    res.status(200).send({ post: deletedPost });
};

const updatePostById = (req: express.Request, res: express.Response) => {
    const toUpdate = req.body;
    console.log(toUpdate);
};

const createPost = async (req: express.Request, res: express.Response) => {
    const body = req.body;
    let createdPost = await PostService.createPost(body);
    res.status(201).send({ post: createdPost });
};

export { getPosts, getPostById, deletePostById, updatePostById, createPost };
