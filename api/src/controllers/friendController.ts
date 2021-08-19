import mongoose from "mongoose";
import { Friend } from "../models/FriendSchema";
import { User } from "../models/UserSchema";

export class FriendController {
    static async getFriends(userID: string) {
        console.log(
            await User.find({ _id: userID })
                .select("friends")
                .where("status")
                .equals(3)
        );
        return await User.aggregate([
            {
                $lookup: {
                    from: Friend.collection.name,
                    let: { friends: "$friends" },
                    pipeline: [
                        {
                            $match: {
                                recipient: mongoose.Types.ObjectId(userID),
                                $expr: { $in: ["$_id", "$$friends"] },
                                status: 3,
                            },
                        },
                        { $project: { status: 1 } },
                    ],
                    as: "friends",
                },
            },
            {
                $project: {
                    password: 0,
                    email: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    isAdmin: 0,
                    __v: 0,
                },
            },
            { $unwind: "$friends" },
            {
                $addFields: {
                    friendsInCommon: {
                        $sum: 1,
                    },
                },
            },
        ]);
    }

    static async getPendingFriends(userID: string) {
        return await Friend.find({
            status: 3,
            $or: [{ recipient: userID }, { requester: userID }],
        });
    }

    static async getSuggestedFriend(userID: string) {
        // Yo que sé XD
        return await User.find({});
    }

    static async sendFriendRequest(requesterID: string, recipientID: string) {
        const requesterDoc = await Friend.findOneAndUpdate(
            { requester: requesterID, recipient: recipientID },
            { $set: { status: 1 } },
            { upsert: true, new: true }
        );
        const recipientDoc = await Friend.findOneAndUpdate(
            { requester: recipientID, recipient: requesterID },
            { $set: { status: 2 } },
            { upsert: true, new: true }
        );
        await User.findOneAndUpdate(
            { _id: requesterID },
            { $addToSet: { friends: requesterDoc._id } }
        );
        await User.findOneAndUpdate(
            { _id: recipientID },
            { $addToSet: { friends: recipientDoc._id } }
        );
    }

    static async acceptFriendRequest(requesterID: string, recipientID: string) {
        await Friend.findOneAndUpdate(
            { requester: requesterID, recipient: recipientID },
            { $set: { status: 3 } }
        );
        await Friend.findOneAndUpdate(
            { requester: recipientID, recipient: requesterID },
            { $set: { status: 3 } }
        );
    }

    static async rejectFriendRequest(requesterID: string, recipientID: string) {
        const requesterDoc = await Friend.findOneAndRemove({
            requester: requesterID,
            recipient: recipientID,
        });
        const recipientDoc = await Friend.findOneAndRemove({
            recipient: requesterID,
            requester: recipientID,
        });

        await User.findOneAndUpdate(
            { _id: requesterID },
            { $pull: { friends: requesterDoc._id } }
        );
        await User.findOneAndUpdate(
            { _id: recipientID },
            { $pull: { friends: recipientDoc._id } }
        );
    }
}
