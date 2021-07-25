import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema: mongoose.Schema = new Schema({
    profileName: {
        type: String,
        required: true,
        maxLength: 40,
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
    },
    phoneNumber: {
        type: Number,
        maxLength: 15,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "Friend",
        },
    ],
});

export const User = mongoose.model("User", UserSchema);
