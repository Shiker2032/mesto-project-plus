import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
} from "../controllers/users";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

export default router;
