import express from "express";
import { UserService } from "../services/userService";
import { createUserValidator } from "../validators/usersValidators/createUserValidator";
import { doesUserExist } from "../validators/usersValidators/doesUserExist";
import { updateUserValidator } from "../validators/usersValidators/updateUserValidator";

export const getUsers = async (req: express.Request, res: express.Response) => {
    let users = await UserService.getAllUsers();
    res.status(200).send({ users: users });
};

export const getUserById = async (
    req: express.Request,
    res: express.Response
) => {
    const userID = req.params.id;
    const errors = await doesUserExist(userID);
    if (errors.length != 0) {
        res.status(400).send({ errors: errors });
        return;
    }

    let user = await UserService.getUserById(userID);
    res.status(200).send({ user: user });
};

export const deleteUserById = async (
    req: express.Request,
    res: express.Response
) => {
    const userToDelete = req.params.id;
    const errors = await doesUserExist(userToDelete);
    if (errors.length != 0) {
        res.status(400).send({ errors: errors });
        return;
    }

    let deletedUser = await UserService.deleteUserById(userToDelete);
    res.status(200).send({ user: deletedUser });
};

export const updateUserById = async (
    req: express.Request,
    res: express.Response
) => {
    const newInfo = req.body;
    const errors = await updateUserValidator(newInfo);
    if (errors.length != 0) {
        res.status(400).send({ errors: errors });
        return;
    }

    const userId = req.params.id;
    let updatedUser = await UserService.updateUserById(userId, newInfo);
    res.status(201).send({ user: updatedUser });
};

export const createUser = async (
    req: express.Request,
    res: express.Response
) => {
    const body = req.body;
    const errors = await createUserValidator(body);
    if (errors.length != 0) {
        res.status(400).send({ errors: errors });
        return;
    }

    let token = await UserService.createUser(body);
    res.status(201).send({ token: token });
};
