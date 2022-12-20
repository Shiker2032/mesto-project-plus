import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
  loginUser,
  userProfile,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/me", userProfile);
router.get("/:userId", getUserById);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

export default router;
