import express from "express";
import {
    getPosts,
    createPost,
    getPostById,
} from "../controllers/postController";

export const postRouter = express.Router();

postRouter.get("/", (req, res) => {
    getPosts(req, res);
});

postRouter.post("/", (req, res) => {
    createPost(req, res);
});

postRouter.get("/:id", (req, res) => {
    getPostById(req, res);
});
