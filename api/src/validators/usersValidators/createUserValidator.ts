import { isEmailValid } from "./emailValidator";
import { User } from "../../models/UserSchema";
import { isPasswordValid } from "./passwordValidator";
export async function createUserValidator(userData: { [key: string]: string }) {
    const errors = [];
    if (await User.findOne({ email: userData.email })) {
        errors.push({
            error: "Validation Error",
            message: "A user with that email already exists.",
        });
    }

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

    return errors;
}
