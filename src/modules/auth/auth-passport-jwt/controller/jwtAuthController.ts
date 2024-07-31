import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../../users/model/UserModel';
import {
  blacklistToken,
  generateJWT,
} from '../../../../middleware/passport/strategies/jwt/jwt-utils';
import jwt from 'jsonwebtoken';
import UserDao from '../../../users/dao/UserDao';

/**
 * Register a new user.
 *
 * This function handles user registration. It hashes the user's password,
 * saves the user to the database, generates a JWT token for the user,
 * blacklists the token, and returns the token in the response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    passwordHash: hashPassword,
    role,
    firstName,
    lastName,
    address,
    phone,
  } = req.body;
  try {
    // Hash the provided password
    const passwordHash = await bcrypt.hash(hashPassword, 10);

    // Initialize the UserDao with the UserModel
    const userDao = new UserDao(UserModel);

    // Create the user in the database
    const userData = await userDao.createUser({
      username,
      email,
      passwordHash,
      role,
      firstName,
      lastName,
      address,
      phone,
    });

    // Generate a JWT token for the newly created user
    const token = generateJWT(userData);
    const expiryDate = new Date(Date.now() + 3600 * 1000); // 1 hour

    // Blacklist the token (optional step depending on your use case)
    await blacklistToken(token, expiryDate);

    if (userData) {
      res.status(201).json({ token });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

/**
 * Log in an existing user.
 *
 * This function handles user login. It verifies the user's email and password,
 * generates a JWT token if the credentials are valid, and returns the token in
 * the response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Initialize the UserDao with the UserModel
    const userDao = new UserDao(UserModel);

    // Find the user by email
    const user = await userDao.findUserByEmail(email);

    // Check if the user exists and the password is valid
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = generateJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

/**
 * Log out the current user.
 *
 * This function handles user logout. It blacklists the provided JWT token
 * to prevent its further use and returns a success message.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      // Decode the token to get its expiry date
      const expiryDate = new Date((jwt.decode(token) as any).exp * 1000);

      // Blacklist the token
      await blacklistToken(token, expiryDate);

      res.json({ message: 'Logged out successfully' });
    } else {
      res.status(400).json({ error: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging out' });
  }
};
