import mongoose from "mongoose";

const Schema = mongoose.Schema;
const friendSchema = new Schema(
    {
        requester: { type: Schema.Types.ObjectId, ref: "User" },
        recipient: { type: Schema.Types.ObjectId, ref: "User" },
        status: {
            type: Number,
            enums: [
                0, //'add friend',
                1, //'requested',
                2, //'pending',
                3, //'friends'
            ],
        },
    },
    { timestamps: true }
);
export const Friend = mongoose.model("Friend", friendSchema);
