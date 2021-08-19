import { UserController } from "../../controllers/userController";
import { UserValidatorResponse } from "../../typings/validators/UserValidatorResponse";

export async function returnUserIfExists(
    userID: string
): Promise<UserValidatorResponse> {
    let errors = [];
    const response: UserValidatorResponse = {};

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
