import { UserController } from "../../controllers/userController";
import { ValidatorResponse } from "../../typings/ValidatorResponse";

export async function returnUserIfExists(
    userID: string
): Promise<ValidatorResponse> {
    const errors = [];
    const response: ValidatorResponse = {};

    try {
        const user = await UserController.getUserById(userID);
        response.user = user;
    } catch (err) {
        errors.push({
            error: "Not Found",
            message: "That user doesn't exists",
        });
        response.errors = errors;
    }
    return response;
}
