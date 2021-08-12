import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema";

export function generateAccessToken(userInformation: User) {
    const tokenExpirationTime = "7d";
    return jwt.sign(
        { id: userInformation.id },
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: tokenExpirationTime,
        }
    );
}
