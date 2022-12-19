import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
  loginUser,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);
router.post("/login", loginUser);

export default router;
