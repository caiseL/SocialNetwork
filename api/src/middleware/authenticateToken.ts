import express from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[0];

    if (token == null)
        return res
            .send({
                error: "Invalid token",
            })
            .status(401);

    const tokenSecret = process.env.TOKEN_SECRET as string;
    jwt.verify(token, tokenSecret, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
