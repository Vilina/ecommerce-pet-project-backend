import {Request, Response, NextFunction} from "express";
import UserModel, {IUser} from "../../../users/model/UserModel";
import passport from "../../../../middleware/passport/strategies/local-strategy";
import bcrypt from "bcrypt";
import UserDao from "../../../users/dao/UserDao";

// Type definition for the info object returned by passport
interface AuthInfo {
    message: string;
}

// Function to handle login authentication
export const authenticateLogin = (req: any, res: Response, next: NextFunction): void => {
    passport.authenticate('local', (err: Error | null, user: IUser | false, info: AuthInfo) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err:Error) => {
            if (err) {
                return next(err);
            }
            req.session.user = user;
            return res.status(200).json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
}

export const registerUser = async (req: Request, res: Response) => {
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

        if(userData) {
            res.status(201).send('User registered successfully');
        }
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.status(200).send('Logged out successfully');
    });
}

