import { User } from "../../../models/UserSchema";

export interface UserResponse {
    errors?: { error: string; message: string }[];
    user?: User;
}
