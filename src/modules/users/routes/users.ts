import { Router } from 'express';
import * as UserController from '../../users/controller/userController';
import {authorizeRoles, authorizeUser} from "../../../middleware/passport/authenticated";

const router = Router();

// GET /users
router.get('/users', authorizeRoles('admin'), UserController.getUsers);

// GET /users/:id
router.get('users/:id',authorizeUser(), UserController.getUserById);

// PUT /users/:id
router.put('/users/:id', authorizeUser(), UserController.updateUserById);

// DELETE /users/:id
router.delete('users/:id', authorizeUser(), UserController.deleteUserById);

export default router;
