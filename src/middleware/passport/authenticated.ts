import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../modules/users/model/UserModel';

/**
 * Middleware function to authorize access based on user roles.
 * @param roles - List of roles that are allowed to access the route.
 * @returns Express middleware function.
 */
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if user is authenticated and has one of the specified roles
        if (!req.isAuthenticated() || !roles.includes((req.user as IUser).role)) {
            // Return 403 Forbidden if user is not authenticated or does not have required role
            return res.status(403).send('Access denied');
        }

        // Call next middleware if user is authenticated and has required role
        next();
    };
};

export const authorizeUser = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            // Return 403 Forbidden if user is not authenticated
            return res.status(403).send('Access denied');
        }

        // Call next middleware if user is authenticated and has required role
        next();
    };
};

/**
 * Middleware to set a 'visited' flag in the user's session.
 *
 * This middleware checks if the 'visited' flag is set in the user's session.
 * If it is not set, it initializes the flag to true, indicating that the user
 * has visited the site during the current session. The middleware then calls
 * the next function to pass control to the next middleware in the stack.
 *
 * @param req - The request object, which contains the session data.
 * @param res - The response object (not used in this middleware).
 * @param next - The next middleware function to call.
 */
export const setVisitedSession = (req: any, res: Response, next: NextFunction) => {
    // Check if the 'visited' flag is not set in the session
    if (!req.session.visited) {
        // Set the 'visited' flag to true
        req.session.visited = true;
    }
    // Call the next middleware function in the stack
    next();
};
