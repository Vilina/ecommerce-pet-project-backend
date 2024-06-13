import { Router } from 'express';
import * as UserController from '../../users/controller/userController';

const router = Router();

// GET /users
router.get('/users', UserController.getUsers);

// GET /users/:id
// router.get('users/:id', UserController.getUserById);

// POST /users
router.post('/user', UserController.createUser);

// PUT /users/:id
router.put('/user/:id', UserController.updateUserById);

// DELETE /users/:id
router.delete('user/:id', UserController.deleteUserById);

export default router;
