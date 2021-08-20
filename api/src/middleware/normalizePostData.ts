import { Request, Response, NextFunction } from "express";

export function normalizePostData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.body.postedBy) req.body.postedBy = undefined;

    if (req.body.numberOfFavourites) req.body.numberOfFavourites = undefined;

    if (req.body.comments.length > 0) req.body.comments = undefined;

    next();
}
