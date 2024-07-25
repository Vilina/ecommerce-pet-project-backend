import { Router } from 'express';
import * as JWTAuthController from '../controller/jwtAuthController';
import {validateSchema} from "../../../../validation-ajv/ajv";
import registrationSchema from "../../shared/validation/registrationSchema";
import loginSchema from "../../shared/validation/loginSchema";
import {authenticateJwt} from "../../../../middleware/passport/strategies/jwt/jwt-strategy";


const router = Router();

router.post('/registerJWT', JWTAuthController.register);
router.post('/loginJWT',  validateSchema(loginSchema), JWTAuthController.login);
router.post('/logoutJWT', authenticateJwt, JWTAuthController.logout);

export default router;
