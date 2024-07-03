import { Router } from 'express';
import passport from '../../../middleware/passport/strategies/local-strategy';
import * as AuthController from '../controller/authController';
import { validateSchema } from "../../../validation-ajv/ajv";
import loginSchema from "../validation/loginSchema";
import registrationSchema from "../validation/registrationSchema";

// Create a new router instance
const router = Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 *
 * This route handles user registration. It validates the request body
 * against the registration schema and then calls the registerUser
 * method from AuthController to create a new user.
 */
router.post('/register', validateSchema(registrationSchema), AuthController.registerUser);

/**
 * @route POST /login
 * @desc Authenticate user and login
 * @access Public
 *
 * This route handles user login. It validates the request body against
 * the login schema and then calls the authenticateLogin method from
 * AuthController to authenticate the user.
 */
router.post('/login', validateSchema(loginSchema), AuthController.authenticateLogin);

/**
 * @route POST /logout
 * @desc Logout user
 * @access Public
 *
 * This route handles user logout. It calls the logoutUser method from
 * AuthController to log the user out.
 */
router.post('/logout', AuthController.logoutUser);

//ToDO
router.post("/auth/google", passport.authenticate('local'), (request, response) => {
    response.status(200).send('user google authentication route');
});


export default router;
