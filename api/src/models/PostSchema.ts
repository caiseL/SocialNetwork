import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
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
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
