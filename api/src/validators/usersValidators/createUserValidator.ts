import { isEmailValid } from "./emailValidator";
import { User } from "../../models/UserSchema";
import { isPasswordValid } from "./passwordValidator";
import { UserController } from "../../controllers/userController";
import { isMimeTypeValid } from "../imageValidator";
import { UserValidatorResponse } from "../../typings/validators/UserValidatorResponse";

export async function createUserValidator(
    userData: User,
    fileMimeType: string | undefined
): Promise<UserValidatorResponse> {
    const response: UserValidatorResponse = {};
    const errors = [];

    if (!userData.profileName) {
        errors.push({
            error: "Syntax Error",
            message: "You need a profile name",
        });
    }

    if (!isEmailValid(userData.email)) {
        errors.push({ error: "Validation Error", message: "Email not valid." });
    }

    if (!isPasswordValid(userData.password)) {
        errors.push({
            error: "Validation Error",
            message: "Password not valid.",
        });
    }

    if (fileMimeType) {
        if (!isMimeTypeValid(fileMimeType)) {
            errors.push({
                error: "Validation Error",
                message: "File not valid.",
            });
        }
    }

    const registeredUsers = await UserController.getRegisteredUsers(userData);
    if (registeredUsers) {
        //! La verdad aqui no sé que estoy haciendo. Lo entiendo y funciona, pero creo que debe de haber otra mejor forma de implementarlo
        registeredUsers.forEach((user: User) => {
            if (user.email == userData.email) {
                errors.push({
                    error: "Validation Error",
                    message: "A user with that email already exists.",
                });
            }
            if (user.profileName == userData.profileName) {
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
