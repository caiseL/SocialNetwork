import { User } from "../models/UserSchema";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateAccessToken";
import { CreateUserResponse } from "../typings/CreateUserResponse";

export class UserController {
    static async getAllUsers() {
        const allUser = await User.find({}, "-__v");
        return allUser;
    }

    static async getUserById(userID: string): Promise<User> {
        const user = await User.findById(userID, "-__v");
        return user!;
    }

    static async createUser(userInfo: User): Promise<CreateUserResponse> {
        const hash = 10;
        userInfo.password = await bcrypt.hashSync(userInfo.password, hash);

        const newUser = new User(userInfo);
        await newUser.save();

        const token = generateAccessToken(newUser);
        const userID = newUser.id;

        const response: CreateUserResponse = {
            token: token,
            userID: userID,
        };

        return response;
    }

    static async loginUser(userInfo: User): Promise<string | undefined> {
        const user = await User.findOne({ email: userInfo.email });

        if (!user) return;

        if (await bcrypt.compareSync(userInfo.password, user.password)) {
            return generateAccessToken(user);
        }
    }

    static async deleteUserById(userID: string): Promise<User> {
        const deletedUser = await User.findByIdAndDelete(userID);
        return deletedUser!;
    }

    static async updateUserById(
        userId: string,
        newInfo: { [key: string]: string }
    ): Promise<User> {
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
        return updatedUser!;
    }

    static async getRegisteredUsers(userData: User) {
        return User.find({
            $or: [
                { profileName: userData.profileName },
                { email: userData.email },
            ],
        });
    }
}
