import { User } from "../models/UserSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken";

export class UserService {
    static async getAllUsers() {
        try {
            const allUser = await User.find({}).select({
                _id: 1,
                email: 1,
                profileName: 1,
                phoneNumber: 1,
            });
            return allUser;
        } catch (e) {
            console.log(`Couldn't fetch every user ${e}`);
        }
    }

    static async getUserById(userID: string) {
        try {
            const user = await User.findById(userID);
            return user;
        } catch (e) {
            console.log(`Couldn't get that user ${e}`);
        }
    }

    static async createUser(userInformation: {
        [key: string]: string;
    }): Promise<string | undefined> {
        const hash = 10;
        userInformation.password = await bcrypt.hashSync(
            userInformation.password,
            hash
        );
        const newUser = new User(userInformation);
        await newUser.save();
        const token = generateAccessToken({
            id: newUser.id,
        });
        return token;
    }

    static async deleteUserById(userID: string) {
        try {
            const deletedUser = await User.findOneAndDelete({
                _id: userID,
            });
            return deletedUser;
        } catch (e) {
            console.error(e);
        }
    }

    static async updateUserById(
        userId: string,
        newInfo: { [key: string]: string }
    ) {
        const hash = 10;
        //! posible bug?
        if (newInfo.password) {
            newInfo.password = await bcrypt.hashSync(newInfo.password, hash);
        }
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            newInfo,
            { new: true }
        );
        return updatedUser;
    }
}
