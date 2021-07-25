import jwt from "jsonwebtoken";

export function generateAccessToken(userInformation: {
    [key: string]: string;
}) {
    const tokenExpirationTime = "7d";
    return jwt.sign(userInformation, process.env.TOKEN_SECRET as string, {
        expiresIn: tokenExpirationTime,
    });
}
