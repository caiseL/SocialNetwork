import { Request, Response, NextFunction } from "express";

export function normalizeUserData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.body.profileName)
        req.body.profileName = req.body.profileName.toLowerCase();

    if (req.body.email) req.body.email = req.body.email.toLowerCase();

    next();
}
