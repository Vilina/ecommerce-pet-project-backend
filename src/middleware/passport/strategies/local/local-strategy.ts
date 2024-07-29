import { Response, NextFunction } from 'express';
import passport from 'passport';
import {IUser} from "../../../../modules/users/model/UserModel";

interface AuthInfo {
    message: string;
}

/**
 * Middleware to handle local authentication and route protection.
 *
 * If the user is already authenticated, it will allow the request to proceed.
 * If the user is not authenticated, it will attempt to authenticate using the
 * provided credentials. If authentication is successful, it will attach the
 * user to the request and session, and proceed to the next middleware.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express stack.
 */
export const authenticateLocal = (req: any, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        // If the user is already authenticated, allow the request to proceed
        return next();
    }

    // If not authenticated, proceed with local authentication
    passport.authenticate('local', (err: Error | null, user: IUser | false, info: AuthInfo) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info?.message || 'Authentication failed' });
        }

        req.logIn(user, (err: any) => {
            if (err) {
                return next(err);
            }
            req.user = user;
            req.session.user = user;
            res.status(200).json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};
