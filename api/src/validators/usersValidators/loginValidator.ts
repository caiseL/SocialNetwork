import { UserResponse } from "../../typings/validators/userValidators/UserResponse";

export function loginValidator(userInfo: {
    [key: string]: string;
}): UserResponse {
    const response: UserResponse = {};
    const errors = [];

    if (Object.keys(userInfo).length === 0) {
        errors.push({
            error: "Validation Error",
            message: "User Info empty",
        });
        response.errors = errors;
        return response;
    }

    if (!userInfo.email || userInfo.email === "") {
        errors.push({
            error: "Validation error",
            message: "Email adress not valid",
        });
    }

    if (!userInfo.password || userInfo.password === "") {
        errors.push({
            error: "Validation Error",
            message: "Password not valid",
        });
    }
    errors.length !== 0
        ? (response.errors = errors)
        : (response.errors = undefined);

    return response;
}
