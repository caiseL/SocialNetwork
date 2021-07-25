import { User } from "../../models/UserSchema";
export async function doesUserExist(userID: string) {
    const errors = [];
    const user = await User.findById(userID);
    console.log(user);
    if (!user)
        errors.push({
            error: "Not Found",
            message: "That user doesn't exists",
        });

    return errors;
}
