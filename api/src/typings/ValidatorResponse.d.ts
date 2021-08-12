import { User } from "../models/UserSchema";

export interface ValidatorResponse {
    errors?: { error: string; message: string }[];
    user?: User;
}
