import express from "express";
import { PostService } from "../services/postService";

export const getPosts = async (req: express.Request, res: express.Response) => {
    let posts = await PostService.getAllPost();
    res.status(200).send({ posts: posts });
};

export const getPostById = async (
    req: express.Request,
    res: express.Response
) => {
    const requestID = req.params.id;
    let post = await PostService.getPostById(requestID);
    res.status(200).send({ post: post });
};

export const deletePostById = (req: express.Request, res: express.Response) => {
    const postToDelete = req.params.id;
    let deletedPost = PostService.deletePostById(postToDelete);

    res.status(200).send({ post: deletedPost });
};

export const updatePostById = (req: express.Request, res: express.Response) => {
    const toUpdate = req.body;
    console.log(toUpdate);
};

export const createPost = async (
    req: express.Request,
    res: express.Response
) => {
    const body = req.body;
    let createdPost = await PostService.createPost(body);
    res.status(201).send({ post: createdPost });
};
