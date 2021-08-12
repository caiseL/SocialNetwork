import { Friend } from "../models/FriendSchema";
import { User } from "../models/UserSchema";

export class FriendService {
    static async sendFriendRequest(requesterID: string, recipientID: string) {
        const docA = await Friend.findOneAndUpdate(
            { requesterID: requesterID, recipientID: recipientID },
            { $set: { status: 1 } },
            { new: true }
        );
        const docB = await Friend.findOneAndUpdate(
            { recipientID: recipientID, requesterID: requesterID },
            { $set: { status: 2 } },
            { new: true }
        );
        await User.findOneAndUpdate(
            { _id: requesterID },
            { $push: { friends: docA._id } }
        );
        await User.findOneAndUpdate(
            { _id: recipientID },
            { $push: { friends: docB._id } }
        );
    }

    static async acceptFriendRequest(requesterID: string, recipientID: string) {
        await Friend.findOneAndUpdate(
            { requester: requesterID, recipient: recipientID },
            { $set: { status: 3 } }
        );
        await Friend.findOneAndUpdate(
            { recipient: requesterID, requester: recipientID },
            { $set: { status: 3 } }
        );
    }

    static async rejectFriendRequest(requesterID: string, recipientID: string) {
        const docA = await Friend.findOneAndRemove({
            requester: requesterID,
            recipient: recipientID,
        });
        const docB = await Friend.findOneAndRemove({
            recipient: requesterID,
            requester: recipientID,
        });
        await User.findOneAndUpdate(
            { _id: requesterID },
            { $pull: { friends: docA._id } }
        );
        await User.findOneAndUpdate(
            { _id: recipientID },
            { $pull: { friends: docB._id } }
        );
    }
}
