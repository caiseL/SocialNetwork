import { User } from "../models/UserSchema";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateAccessToken";
import { CreateUserResponse } from "../typings/validators/CreateUserResponse";

export class UserController {
    static async getAllUsers(): Promise<User[]> {
        const allUser = await User.find({}, "-__v").lean<User[]>();
        return allUser;
    }

    static async getUserById(userID: string): Promise<User> {
        const user = await User.findById(userID, "-__v").lean<User>();

        if (!user) throw new Error();

        return user;
    }

    static async createUser(userInfo: User): Promise<CreateUserResponse> {
        const hash = 10;
        userInfo.password = await bcrypt.hashSync(userInfo.password, hash);

        const newUser = await new User(userInfo).save();

        const token = generateAccessToken(newUser);
        const { id: userID } = newUser;

        const response: CreateUserResponse = {
            token: token,
            userID: userID,
        };

        return response;
    }

    static async loginUser(userInfo: User): Promise<string | undefined> {
        const user = await User.findOne({
            email: userInfo.email,
        })
            .select("password")
            .lean<User>();

        if (!user) return;

        return (await bcrypt.compareSync(userInfo.password, user.password))
            ? generateAccessToken(user)
            : undefined;
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
        ).select("-__v");
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

    static async doesUserExist(userID: string): Promise<boolean> {
        if (!userID) return false;
        return await User.exists({ _id: userID });
    }
}
