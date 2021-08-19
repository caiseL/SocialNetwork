import { Friend } from "../../models/FriendSchema";
import { SendFriendRequestValidator } from "../../typings/validators/SendFriendRequestValidator";

export async function sendFriendRequestValidator(
    requesterID: string,
    recipientID: string
): Promise<SendFriendRequestValidator> {
    const response: SendFriendRequestValidator = {};
    const errors = [];

    if (requesterID === recipientID)
        errors.push({
            error: "Syntax error",
            message: "You can't send a friend request to yourself",
        });

    if (
        await Friend.findOne({
            status: 3,
            $or: [
                { requester: requesterID, recipient: recipientID },
                { recipient: requesterID, requester: recipientID },
            ],
        })
    )
        errors.push({
            error: "Syntax error",
            message: "This user is already your friend",
        });

    response.errors = errors;

    return response;
}
