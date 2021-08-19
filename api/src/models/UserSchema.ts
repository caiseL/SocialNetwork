import { Schema, model, Document } from "mongoose";

export interface User extends Document {
    profileName: string;
    profilePhoto?: string;
    email: string;
    phoneNumber?: number;
    password: string;
    friends?: Array<string>;
    isAdmin: boolean;
}

const UserSchema: Schema = new Schema(
    {
        profileName: {
            type: String,
            required: true,
            maxLength: 40,
        },
        profilePhoto: {
            type: String,
            default: "",
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
            select: false,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "Friend",
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
            select: false,
        },
    },
    { timestamps: true }
);

export const User = model<User>("User", UserSchema);
