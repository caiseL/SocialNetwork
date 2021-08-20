import { PostController } from "../../controllers/postController";
import { PostResponse } from "../../typings/validators/postValidators/PostResponse";

export async function returnPostIfExists(postID: string) {
    let errors = [];
    const response: PostResponse = {};

    const post = await PostController.getPostById(postID);
    if (!post) {
        errors.push({
            error: "Not Found",
            message: "That post doesn't exists",
        });
        response.errors = errors;
    } else {
        response.post = post;
    }

    return response;
}
