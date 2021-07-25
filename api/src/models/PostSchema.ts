import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 512,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        numberOfFavourites: {
            type: Number,
            required: true,
            default: 0,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
