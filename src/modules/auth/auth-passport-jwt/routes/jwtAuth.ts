import { Router } from 'express';
import * as JWTAuthController from '../controller/jwtAuthController';
import { validateSchema } from '../../../../validation-ajv/ajv';
import registrationSchema from '../../shared/validation/registrationSchema';
import loginSchema from '../../shared/validation/loginSchema';

// Create a new Router instance
const router = Router();

/**
 * Route to register a new user.
 *
 * This route validates the request body against the registration schema
 * and then calls the register controller function to handle the registration.
 *
 * @route POST /authJWT/register
 * @access Public
 */
router.post(
  '/authJWT/register',
  validateSchema(registrationSchema),
  JWTAuthController.register,
);

/**
 * Route to log in an existing user.
 *
 * This route validates the request body against the login schema
 * and then calls the login controller function to handle the authentication.
 *
 * @route POST /authJWT/login
 * @access Public
 */
router.post(
  '/authJWT/login',
  validateSchema(loginSchema),
  JWTAuthController.login,
);

/**
 * Route to log out the current user.
 *
 * This route calls the logout controller function to handle the logout process.
 *
 * @route POST /authJWT/logout
 * @access Private
 */
router.post('/authJWT/logout', JWTAuthController.logout);

// Export the router to be used in other parts of the application
export default router;
