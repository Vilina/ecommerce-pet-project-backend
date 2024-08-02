import { Router } from 'express';
import * as AuthController from '../controller/authController';
import { validateSchema } from "../../../../validation-ajv/ajv";
import loginSchema from "../../shared/validation/loginSchema";
import registrationSchema from "../../shared/validation/registrationSchema";

// Create a new router instance
const router = Router();

/**
 * @route POST /authLocal/register
 * @desc Register a new user
 * @access Public
 *
 * This route handles user registration. It validates the request body
 * against the registration schema and then calls the registerUser
 * method from AuthController to create a new user.
 */
router.post('/authLocal/register', validateSchema(registrationSchema), AuthController.registerUser);

/**
 * @route POST /authLocal/login
 * @desc Authenticate user and login
 * @access Public
 *
 * This route handles user login. It validates the request body against
 * the login schema and then calls the authenticateLogin method from
 * AuthController to authenticate the user.
 */
router.post('/authLocal/login', validateSchema(loginSchema), AuthController.loginUser);

/**
 * @route POST /authLocal/logout
 * @desc Logout user
 * @access Public
 *
 * This route handles user logout. It calls the logoutUser method from
 * AuthController to log the user out.
 */
router.post('/authLocal/logout', AuthController.logoutUser);

//ToDO
router.post("/auth/google", (request, response) => {
    response.status(200).send('user google authentication route');
});


export default router;
