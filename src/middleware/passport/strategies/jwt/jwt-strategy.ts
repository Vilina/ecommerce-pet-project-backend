import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { isTokenBlacklisted, verifyJWT } from './jwt-utils';

/**
 * JWT authentication middleware for Express.
 *
 * This middleware uses Passport to authenticate the JWT token. It performs
 * several checks to ensure the token is valid, not blacklisted, and associated
 * with a valid user. If the checks pass, the user information is attached to
 * the request object, and the request is passed to the next middleware or route
 * handler. If any check fails, a 401 Unauthorized response is returned.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express stack.
 */
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err: any, user: any) => {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1] || '';

        // If there is an error, no user, or no token, return a 401 Unauthorized response
        if (err || !user || !token) {
            return res.status(401).json({ message: 'Unauthorized user or missing token' });
        }

        try {
            // Verify the JWT token
            verifyJWT(token);

            // Check if the token is blacklisted
            const isBlacklisted = await isTokenBlacklisted(token);
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
            }

            // Attach the user to the request object
            req.user = user;
            next();
        } catch (error) {
            // If an error occurs during verification or blacklist check, return a 401 Unauthorized response
            return res.status(401).json({ message: 'Unauthorized', error });
        }
    })(req, res, next);
};
