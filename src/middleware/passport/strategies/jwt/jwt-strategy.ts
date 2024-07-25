import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {isTokenBlacklisted, verifyJWT} from "./jwt-utils";
import {IUser} from "../../../../modules/users/model/UserModel";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log('ooooooo')
    passport.authenticate('jwt', { session: false }, async (err:any, user:any) => {
        console.log(5555)
        const token = req.headers.authorization?.split(' ')[1] || '';

        if (err || !user || !token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            console.log(1111)
            verifyJWT(token);
            const isBlacklisted = await isTokenBlacklisted(token);
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            console.log(2222)
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized', error });
        }
    })(req, res, next);
};
