import express from "express";
import jwt from "jsonwebtoken";
import { UserController } from "../controllers/userController";

export function authenticateToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[0];

    if (token == null)
        return res.status(401).send({
            error: "Invalid token",
        });

    const tokenSecret = process.env.TOKEN_SECRET as string;
    jwt.verify(token, tokenSecret, async (err: any, user: any) => {
        //! Solución temporal. Lo mejor será usar Redis para guardar esos tokens
        if (err || !user.id || !(await UserController.doesUserExist(user.id)))
            return res.sendStatus(403);

        req.user = user;
        console.log(req.user);
        console.log(user.id);
        next();
    });
}
