import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema";

export function generateAccessToken(userInformation: User) {
    const tokenExpirationTime = "3d";
    return jwt.sign(
        { id: userInformation._id },
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: tokenExpirationTime,
        }
    );
}
