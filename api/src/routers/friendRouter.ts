import { Router, Request, Response } from "express";
import { FriendService } from "../services/friendService";

export const friendRouter = Router();

friendRouter.get("/getFriends/:id", (req: Request, res: Response) => {
    return FriendService.getFriends(req, res);
});

friendRouter.get("/sendFriendRequest/:id", (req: Request, res: Response) => {
    return FriendService.sendFriendRequest(req, res);
});

friendRouter.get("/acceptFriendRequest/:id", (req: Request, res: Response) => {
    return FriendService.acceptFriendRequest(req, res);
});

friendRouter.get("/rejectFriendRequest/:id", (req: Request, res: Response) => {
    return FriendService.rejectFriendRequest(req, res);
});
