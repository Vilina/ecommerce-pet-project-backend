import jwt from 'jsonwebtoken';
import TokenDao from "./dao/TokenDao";
import TokenModel from "./model/TokenModel";
import { IUser } from "../../../../modules/users/model/UserModel";

// Initialize the TokenDao with the TokenModel
const tokenDao = new TokenDao(TokenModel);

/**
 * Generate a JWT for a user.
 *
 * This function creates a JWT token for the provided user. The token contains
 * the user's ID and username as the payload and is signed using a secret key.
 * The token is set to expire in 1 hour.
 *
 * @param {IUser} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */
export const generateJWT = (user: IUser): string => {
    const payload = {
        userId: user._id,
        username: user.username,
    };

    return jwt.sign(payload, 'jwt-secret-key', { expiresIn: '1h' });
};

/**
 * Verify a JWT token.
 *
 * This function verifies the provided JWT token using a secret key. If the token
 * is valid, it returns the decoded payload. If the token is invalid, it throws
 * an error.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {jwt.JwtPayload | string} - The decoded JWT payload if valid, otherwise an error is thrown.
 */
export const verifyJWT = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, 'jwt-secret-key');
};

/**
 * Blacklist a JWT token.
 *
 * This function blacklists a JWT token by storing it in the database with its
 * expiry date. A blacklisted token is considered invalid for future requests.
 *
 * @param {string} token - The JWT token to blacklist.
 * @param {Date} expiryDate - The expiry date of the token.
 * @returns {Promise<void>} - A promise that resolves when the token is blacklisted.
 */
export const blacklistToken = async (token: string, expiryDate: Date): Promise<void> => {
    await tokenDao.blacklistToken(token, expiryDate);
};

/**
 * Check if a JWT token is blacklisted.
 *
 * This function checks if the provided JWT token is blacklisted. It queries the
 * database to see if the token exists in the blacklist.
 *
 * @param {string} token - The JWT token to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the token is blacklisted, otherwise false.
 */
export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    return tokenDao.isTokenBlacklisted(token);
};
