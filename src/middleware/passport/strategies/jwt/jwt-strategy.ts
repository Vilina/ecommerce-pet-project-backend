import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { isTokenBlacklisted, verifyJWT } from './jwt-utils';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err: any, user: any) => {
        const token = req.headers.authorization?.split(' ')[1] || '';
        if (err || !user || !token) {
            return res.status(401).json({ message: 'Unauthorized user or missed token' });
        }

        try {
            verifyJWT(token);
            const isBlacklisted = await isTokenBlacklisted(token);
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Unauthorized isBlacklisted' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized', error });
        }
    })(req, res, next);
};
