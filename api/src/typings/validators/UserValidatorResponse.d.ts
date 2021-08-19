import { User } from "../../models/UserSchema";

export interface UserValidatorResponse {
    errors?: { error: string; message: string }[];
    user?: User;
}
