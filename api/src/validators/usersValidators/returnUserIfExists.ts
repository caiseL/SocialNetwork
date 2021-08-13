import { UserController } from "../../controllers/userController";
import { ValidatorResponse } from "../../typings/ValidatorResponse";

export async function returnUserIfExists(
    userID: string
): Promise<ValidatorResponse> {
    let errors = [];
    const response: ValidatorResponse = {};

    try {
        response.user = await UserController.getUserById(userID);
        response.errors = undefined;
    } catch (err) {
        errors.push({
            error: "Not Found",
            message: "That user doesn't exists",
        });
        response.errors = errors;
    }

    return response;
}
