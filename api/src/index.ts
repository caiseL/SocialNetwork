import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
    const root = {
        Users: {
            GET_EVERYTHING: "/users/",
            GET_ONE: "/users/id",
            POST: "/users/",
            PUT: "/users/id",
            DELETE: "/users/id",
        },
    };
    res.send(root);
};
