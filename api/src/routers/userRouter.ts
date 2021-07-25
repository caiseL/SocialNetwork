import express from "express";
import {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticateToken";

export const userRouter = express.Router();

userRouter.get("/", authenticateToken, (req, res) => {
    getUsers(req, res);
});

userRouter.get("/:id", authenticateToken, (req, res) => {
    getUserById(req, res);
});

userRouter.post("/", (req: express.Request, res: express.Response) => {
    createUser(req, res);
});

userRouter.put(
    "/:id",
    authenticateToken,
    (req: express.Request, res: express.Response) => {
        updateUserById(req, res);
    }
);

userRouter.delete(
    "/:id",
    authenticateToken,
    (req: express.Request, res: express.Response) => {
        deleteUserById(req, res);
    }
);
