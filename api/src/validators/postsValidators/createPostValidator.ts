import { Post } from "../../models/PostSchema";
import { PostResponse } from "../../typings/validators/postValidators/PostResponse";
import { isTextValid } from "./textValidator";

export function createPostValidator(postInfo: Post): PostResponse {
    const response: PostResponse = {};
    const errors = [];

    if (!isTextValid(postInfo.text)) {
        errors.push({
            error: "Syntax error",
            message: "Text is not valid",
        });
    }

    response.errors = errors;
    console.log(response.errors === undefined);

    errors.length !== 0
        ? (response.errors = errors)
        : (response.errors = undefined);

    return response;
}
