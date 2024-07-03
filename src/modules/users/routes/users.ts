import { Router } from 'express';
import * as UserController from '../../users/controller/userController';
import {authorizeRoles, authorizedUser} from "../../../middleware/passport/authorization";

const router = Router();

// GET /users
router.get('/users', authorizeRoles('admin'), UserController.getUsers);

// GET /users/:id
router.get('users/:id',authorizedUser(), UserController.getUserById);

// PUT /users/:id
router.put('/users/:id', authorizedUser(), UserController.updateUserById);

// DELETE /users/:id
router.delete('users/:id', authorizedUser(), UserController.deleteUserById);

export default router;
