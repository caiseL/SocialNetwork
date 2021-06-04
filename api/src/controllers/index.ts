import { Request, Response } from "express";

export default (req: Request, res: Response) => {
    const index = {
        Posts: "/posts",
    };
    res.send(index);
};
