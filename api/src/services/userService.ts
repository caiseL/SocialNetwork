import express from "express";
import { UserController } from "../controllers/userController";
import { returnURLFromPhoto } from "../utils/uploadPhoto";
import { createUserValidator } from "../validators/usersValidators/createUserValidator";
import { returnUserIfExists } from "../validators/usersValidators/returnUserIfExists";
import { updateUserValidator } from "../validators/usersValidators/updateUserValidator";

export class UserService {
    static async getUsers(req: express.Request, res: express.Response) {
        const users = await UserController.getAllUsers();
        return res.status(200).send({ users: users });
    }

    static async getUserById(req: express.Request, res: express.Response) {
        const userID = req.params.id;

        const { errors, user } = await returnUserIfExists(userID);
        if (errors) {
            return res.status(400).send({ errors: errors });
        }
        return res.status(200).send({ user: user });
    }

    static async deleteUserById(req: express.Request, res: express.Response) {
        const userToDeleteID = req.params.id;

        const { errors, user } = await returnUserIfExists(userToDeleteID);
        if (errors) return res.status(400).send({ errors: errors });

        return res.status(200).send({ user: user });
    }

    static async updateUserById(req: express.Request, res: express.Response) {
        const newUserInfo = req.body;

        const { errors } = await updateUserValidator(newUserInfo);
        if (errors !== undefined) {
            return res.status(400).send({ errors: errors });
        }

        const userToUpdateID = req.params.id;
        const updatedUser = await UserController.updateUserById(
            userToUpdateID,
            newUserInfo
        );

        return res.status(201).send({ user: updatedUser });
    }

    static async createUser(req: express.Request, res: express.Response) {
        const newUserInfo = req.body;
        const file = req.file;
        const fileMimeType = file?.mimetype;

        const { errors } = await createUserValidator(newUserInfo, fileMimeType);
        if (errors) {
            return res.status(400).send({ errors: errors });
        }

        const { token, userID } = await UserController.createUser(newUserInfo);

        //? Podría mandar el token, pero seguir trabajando con la foto luego de mandarlo para no tardar tanto: "res.status(201).send({ token: token });"

        if (file) {
            const profilePhotoURL = await returnURLFromPhoto(file, userID);
            await UserController.updateUserById(userID, {
                profilePhoto: profilePhotoURL,
            });
        }

        return res.status(201).send({ token: token });
    }

    static async loginUser(req: express.Request, res: express.Response) {
        const userInfo = req.body;
        const token = await UserController.loginUser(userInfo);
        if (!token) return res.status(403);

        return res.status(200).send({ token: token });
    }
}
