import { Request, Response, Router } from "express";
import { multerUpload } from "../config/multerUpload";
import { authenticateToken } from "../middleware/authenticateToken";
import { normalizeUserData } from "../middleware/normalizeUserData";
import { UserService } from "../services/userService";

export const userRouter = Router();

userRouter.get("/", authenticateToken, (req: Request, res: Response) => {
    return UserService.getUsers(req, res);
});

userRouter.get("/:id", authenticateToken, (req: Request, res: Response) => {
    return UserService.getUserById(req, res);
});

userRouter.post("/login", normalizeUserData, (req: Request, res: Response) => {
    return UserService.loginUser(req, res);
});

userRouter.post(
    "/",
    multerUpload("profilePhoto"),
    normalizeUserData,
    (req: Request, res: Response) => {
        return UserService.createUser(req, res);
    }
);

userRouter.put(
    "/:id",
    authenticateToken,
    normalizeUserData,
    (req: Request, res: Response) => {
        return UserService.updateUserById(req, res);
    }
);

userRouter.delete("/:id", authenticateToken, (req: Request, res: Response) => {
    return UserService.deleteUserById(req, res);
});
