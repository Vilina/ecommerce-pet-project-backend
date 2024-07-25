import jwt from 'jsonwebtoken';
import TokenDao from "./dao/TokenDao";
import TokenModel from "./model/TokenModel";
import {IUser} from "../../../../modules/users/model/UserModel";


const tokenDao = new TokenDao(TokenModel);

export const generateJWT = (user: IUser): string => {
    const payload = {
        userId: user._id,
        username: user.username,
    };

    return jwt.sign(payload, 'jwt-secret-key', { expiresIn: '1h' });
};

export const verifyJWT = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, 'jwt-secret-key');
};

export const blacklistToken = async (token: string, expiryDate: Date): Promise<void> => {
    await tokenDao.blacklistToken(token, expiryDate);
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    return tokenDao.isTokenBlacklisted(token);
};
