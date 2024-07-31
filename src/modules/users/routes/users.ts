import { Router } from 'express';
import * as UserController from '../../users/controller/userController';
import { authenticateLocal } from '../../../middleware/passport/strategies/local/local-strategy';
import { authorizeRoles } from '../../../middleware/passport/strategies/local/local-guards';

const router = Router();

// GET /users
router.get(
  '/users',
  authenticateLocal,
  authorizeRoles('admin'),
  UserController.getUsers,
);

// GET /users/:id
router.get('users/:id', authenticateLocal, UserController.getUserById);

// PUT /users/:id
router.put('/users/:id', authenticateLocal, UserController.updateUserById);

// DELETE /users/:id
router.delete('users/:id', authenticateLocal, UserController.deleteUserById);

export default router;
