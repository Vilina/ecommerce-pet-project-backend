import {NextFunction, Request, Response} from 'express';
import UserDao from '../dao/UserDao';
import UserModel from "../models/UserModel";

/**
 * Controller for fetching all users.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userDao = new UserDao(UserModel)
        const users = await userDao.findAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error getUsers' });
    }
};

/**
 * Controller for fetching a user by ID.
 */

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userDao = new UserDao(UserModel)
        const user = await userDao.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found getUserById' });
        }
        // req.user = user; // Attach user object to the request
        next();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error getUserById' });
    }
}

/**
 * Controller for creating a new user.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const userDao = new UserDao(UserModel)
        const newUser = await userDao.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error createUser' });
    }
};

/**
 * Controller for updating a user by ID.
 */
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const userDao = new UserDao(UserModel)
        const updatedUser = await userDao.updateUserById(id, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error updateUserById' });
    }
};

/**
 * Controller for deleting a user by ID.
 */
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userDao = new UserDao(UserModel)
        const deletedUser = await userDao.deleteUserById(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error deleteUserById' });
    }
};
