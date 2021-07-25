import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CommentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        numberOfFavourites: {
            type: Number,
            required: true,
            default: 0,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reply",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
