import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 20,
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
        required: false,
        maxLength: 15,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
