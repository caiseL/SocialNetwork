import { User } from "../../models/UserSchema";
import { isEmailValid } from "./emailValidator";
import { isPasswordValid } from "./passwordValidator";
export async function updateUserValidator(userData: { [key: string]: string }) {
    const errors = [];

    if (await User.findOne({ email: userData.email })) {
        errors.push({
            error: "Validation Error",
            message: "A user with that email already exists.",
        });
    }

    if (!isEmailValid(userData.email)) {
        errors.push({ error: "Validation Error", message: "Email not valid" });
    }

    if (!isPasswordValid(userData.password)) {
        errors.push({
            error: "Validation Error",
            message: "Password not valid",
        });
    }

    return errors;
}
