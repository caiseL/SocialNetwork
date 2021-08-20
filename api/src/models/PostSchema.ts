import mongoose from "mongoose";

const Schema = mongoose.Schema;
export interface Post extends mongoose.Document {
    text: string;
    media: string;
    postedBy: string;
    numberOfFavourites: number;
    comments: Array<string>;
}

const PostSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 512,
        },
        media: {
            type: String,
            default: "",
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

export const Post = mongoose.model<Post>("Post", PostSchema);
