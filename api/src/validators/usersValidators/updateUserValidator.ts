import { UserController } from "../../controllers/userController";
import { User } from "../../models/UserSchema";
import { UserResponse } from "../../typings/validators/userValidators/UserResponse";
import { isEmailValid } from "./emailValidator";
import { isPasswordValid } from "./passwordValidator";

export async function updateUserValidator(
    newUserData: User
): Promise<UserResponse> {
    const response: UserResponse = {};
    const errors = [];

    if (Object.keys(newUserData).length === 0) {
        errors.push({
            error: "Validation Error",
            message: "User Info not valid",
        });
    }

    if (newUserData.email || newUserData.email === "") {
        if (!isEmailValid(newUserData.email)) {
            errors.push({
                error: "Validation Error",
                message: "Email not valid",
            });
        }
    }

    if (newUserData.password || newUserData.password === "") {
        if (!isPasswordValid(newUserData.password)) {
            errors.push({
                error: "Validation Error",
                message: "Password not valid",
            });
        }
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

    errors.length !== 0
        ? (response.errors = errors)
        : (response.errors = undefined);

    return response;
}
