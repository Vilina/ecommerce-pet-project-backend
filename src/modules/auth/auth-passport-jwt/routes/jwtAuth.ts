import { Router } from 'express';
import * as JWTAuthController from '../controller/jwtAuthController';
import {validateSchema} from "../../../../validation-ajv/ajv";
import registrationSchema from "../../shared/validation/registrationSchema";
import loginSchema from "../../shared/validation/loginSchema";


const router = Router();

router.post('/registerJWT', validateSchema(registrationSchema), JWTAuthController.register);
router.post('/loginJWT',  validateSchema(loginSchema), JWTAuthController.login);
router.post('/logoutJWT', JWTAuthController.logout);

export default router;
