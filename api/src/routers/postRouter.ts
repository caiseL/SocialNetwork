import express from "express";
import { normalizePostData } from "../middleware/normalizePostData";
import { PostService } from "../services/postService";

export const postRouter = express.Router();

postRouter.get("/", (req: express.Request, res: express.Response) => {
    return PostService.getPosts(req, res);
});

postRouter.post(
    "/",
    normalizePostData,
    (req: express.Request, res: express.Response) => {
        return PostService.createPost(req, res);
    }
);

postRouter.get("/:id", (req: express.Request, res: express.Response) => {
    return PostService.getPostById(req, res);
});

postRouter.put(
    "/:id",
    normalizePostData,
    (req: express.Request, res: express.Response) => {
        return PostService.updatePostById(req, res);
    }
);

postRouter.delete("/:id", (req: express.Request, res: express.Response) => {
    return PostService.deletePostById(req, res);
});
