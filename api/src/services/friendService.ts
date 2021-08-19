import { Request, Response } from "express";
import { FriendController } from "../controllers/friendController";
import { sendFriendRequestValidator } from "../validators/friendValidators/sendFriendRequestValidator";

export class FriendService {
    static async getFriends(req: Request, res: Response) {
        const userID = req.params.id;
        console.log(userID);
        const users = await FriendController.getFriends(userID);

        return res.status(200).send({ users: users });
    }

    static async sendFriendRequest(req: Request, res: Response) {
        const requester = req.user.id;
        const recipient = req.params.id;

        const { errors } = await sendFriendRequestValidator(
            requester,
            recipient
        );

        if (errors) {
            console.log("A");
        }

        await FriendController.sendFriendRequest(requester, recipient);

        return res.status(200).send({
            friends: {
                requester: requester,
                recipient: recipient,
                relationship: "Friend requested",
            },
        });
    }

    static async acceptFriendRequest(req: Request, res: Response) {
        const requester = req.user.id;
        const recipient = req.params.id;

        await FriendController.acceptFriendRequest(requester, recipient);

        return res.status(200).send({
            friends: {
                requester: requester,
                recipient: recipient,
                relationship: "Friends",
            },
        });
    }

    static async rejectFriendRequest(req: Request, res: Response) {
        const requester = req.user.id;
        const recipient = req.params.id;

        await FriendController.rejectFriendRequest(requester, recipient);

        return res.status(200).send({
            friends: {
                requester: requester,
                recipient: recipient,
                relationship: "Friend request rejected",
            },
        });
    }
}
