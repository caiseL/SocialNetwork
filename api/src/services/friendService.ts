import express from "express";
import { FriendService } from "../controllers/friendController";

export const sendFriendRequest = async (
    req: express.Request,
    res: express.Response
) => {
    const requester = req.user.id;
    const recipient = req.params.id;

    await FriendService.sendFriendRequest(requester, recipient);

    res.status(200).send({
        requester: requester,
        recipient: recipient,
        relationship: "Friend requested",
    });
};

export const acceptFriendRequest = async (
    req: express.Request,
    res: express.Response
) => {
    const requester = req.user.id;
    const recipient = req.params.id;

    await FriendService.acceptFriendRequest(requester, recipient);

    res.status(200).send({
        requester: requester,
        recipient: recipient,
        relationship: "Friends",
    });
};

export const rejectFriendRequest = async (
    req: express.Request,
    res: express.Response
) => {
    const requester = req.user.id;
    const recipient = req.params.id;

    await FriendService.rejectFriendRequest(requester, recipient);

    res.status(200).send({
        requester: requester,
        recipient: recipient,
        relationship: "Friend request rejected",
    });
};
