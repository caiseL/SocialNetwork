import express from "express";
import { UserController } from "../controllers/userController";
import { deleteProfilePhotoFromID } from "../utils/cloudinary/user/deleteProfilePhotoFromID";
import { returnURLFromPhoto } from "../utils/cloudinary/user/uploadUserPhoto";
import { createUserValidator } from "../validators/usersValidators/createUserValidator";
import { loginValidator } from "../validators/usersValidators/loginValidator";
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
        if (errors) return res.status(400).send({ errors: errors });

        return res.status(200).send({ user: user });
    }

    static async createUser(req: express.Request, res: express.Response) {
        const newUserInfo = req.body;
        const file = req.file;
        const fileMimeType = file?.mimetype;

        const { errors } = await createUserValidator(newUserInfo, fileMimeType);
        if (errors) return res.status(400).send({ errors: errors });

        const { token, user } = await UserController.createUser(newUserInfo);

        //? Podría mandar el token, pero seguir trabajando con la foto luego de mandarlo para no tardar tanto: "res.status(201).send({ token: token });"

        if (file) {
            const profilePhotoURL = await returnURLFromPhoto(file, user.id);
            await UserController.updateUserById(user.id, {
                profilePhoto: profilePhotoURL,
            });
        }

        return res.status(201).send({ token: token });
    }

    static async loginUser(req: express.Request, res: express.Response) {
        const userInfo = req.body;

        const { errors } = loginValidator(userInfo);
        if (errors) return res.status(400).send({ errors: errors });

        const token = await UserController.loginUser(userInfo);
        if (!token)
            return res.status(403).send({
                errors: {
                    error: "Validation Error",
                    message: "Invalid credentials",
                },
            });

        return res.status(200).send({ token: token });
    }

    static async updateUserById(req: express.Request, res: express.Response) {
        const newUserInfo = req.body;
        const userToUpdateID = req.params.id;
        const file = req.file;

        const { errors } = await updateUserValidator(newUserInfo);
        if (errors) return res.status(400).send({ errors: errors });

        if (file) {
            const profilePhotoURL = await returnURLFromPhoto(
                file,
                userToUpdateID
            );
            newUserInfo.profilePhoto = profilePhotoURL;
        }

        const updatedUser = await UserController.updateUserById(
            userToUpdateID,
            newUserInfo
        );

        return res.status(201).send({ user: updatedUser });
    }

    static async deleteUserById(req: express.Request, res: express.Response) {
        const userToDeleteID = req.params.id;

        const { errors, user } = await returnUserIfExists(userToDeleteID);
        if (errors) return res.status(400).send({ errors: errors });

        if (user?.profilePhoto) {
            await deleteProfilePhotoFromID(user?.id);
        }
        await UserController.deleteUserById(user?.id);

        return res.status(200).send({ user: user });
    }
}
