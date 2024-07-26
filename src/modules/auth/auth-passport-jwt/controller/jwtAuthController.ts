import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../../users/model/UserModel';
import { blacklistToken, generateJWT } from '../../../../middleware/passport/strategies/jwt/jwt-utils';
import jwt from 'jsonwebtoken';
import UserDao from "../../../users/dao/UserDao";

export const register = async (req: Request, res: Response) => {
    const {username, email, passwordHash: hashPassword, role, firstName, lastName, address, phone} = req.body;
    try {
        const passwordHash = await bcrypt.hash(hashPassword, 10);
        const userDao = new UserDao(UserModel)
        const userData = await userDao.createUser({
            username,
            email,
            passwordHash,
            role,
            firstName,
            lastName,
            address,
            phone
        });

        const token = generateJWT(userData);
        const expiryDate = new Date(Date.now() + 3600 * 1000); // 1 hour
        await blacklistToken(token, expiryDate);

        if(userData) {
            res.status(201).json({ token });;
        }
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userDao = new UserDao(UserModel);
        const user = await userDao.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateJWT(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const expiryDate = new Date((jwt.decode(token) as any).exp * 1000);
            await blacklistToken(token, expiryDate);
            res.json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ error: 'Invalid token' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error logging out' });
    }
};
