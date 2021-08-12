import { UserController } from "../../controllers/userController";
import { User } from "../../models/UserSchema";
import { ValidatorResponse } from "../../typings/ValidatorResponse";
import { isEmailValid } from "./emailValidator";
import { isPasswordValid } from "./passwordValidator";

export async function updateUserValidator(
    newUserData: User
): Promise<ValidatorResponse> {
    const errors = [];
    const response: ValidatorResponse = {};

    if (newUserData.email && !isEmailValid(newUserData.email)) {
        errors.push({ error: "Val:idation Error", message: "Email not valid" });
    }

    if (newUserData.password && !isPasswordValid(newUserData.password)) {
        errors.push({
            error: "Validation Error",
            message: "Password not valid",
        });
    }
    const registeredUsers = await UserController.getRegisteredUsers(
        newUserData
    );
    if (registeredUsers) {
        registeredUsers.forEach((user: User) => {
            if (user.email == newUserData.email) {
                errors.push({
                    error: "Validation Error",
                    message: "A user with that email already exists.",
                });
            }
            if ((user.profileName = newUserData.profileName)) {
                errors.push({
                    error: "Validation Error",
                    message: "A user with that profile name already exists.",
                });
            }
        });
    }

    response.errors = errors;

    return response;
}
