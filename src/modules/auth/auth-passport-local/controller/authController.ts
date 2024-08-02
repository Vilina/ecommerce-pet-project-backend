import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import UserDao from "../../../users/dao/UserDao";
import UserModel from "../../../users/model/UserModel";
import {authenticateLocal} from "../../../../middleware/passport/strategies/local/local-strategy";


export const loginUser = (req: any, res: Response, next: NextFunction): void => {
    authenticateLocal(req, res, (err: any) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged in successfully', user: req.user });
    });
};

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


/**
 * Logout controller to handle user logout.
 *
 * This controller destroys the user session and responds with a success message.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object to send the response.
 * @param {NextFunction} next - The next middleware function in the Express stack.
 */
export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err: any) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

