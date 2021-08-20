import { UserController } from "../../controllers/userController";
import { UserResponse } from "../../typings/validators/userValidators/UserValidatorResponse";

export async function returnUserIfExists(
    userID: string
): Promise<UserResponse> {
    let errors = [];
    const response: UserResponse = {};

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
