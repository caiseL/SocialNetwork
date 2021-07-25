import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
    const root = {
        Users: "/users/",
    };
    res.send(root);
};
