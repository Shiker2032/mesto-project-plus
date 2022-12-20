import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
  userProfile,
} from '../controllers/users';
import {
  getUserByIdValidator,
  updateUserAvatarValidator,
  updateUserValidator,
} from '../middlewares/validators';

const router = Router();

router.get('/', getUsers);
router.get('/me', userProfile);
router.get('/:userId', getUserByIdValidator, getUserById);
router.patch('/me', updateUserValidator, updateUser);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

export default router;
