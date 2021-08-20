import { User } from "../../../models/UserSchema";

export interface CreateUserResponse {
    token: string;
    user: User;
}
