import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReplySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    numberOfFavourites: {
        type: Number,
        default: 0,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;
