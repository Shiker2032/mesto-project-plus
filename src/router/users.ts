import { Router } from "express";
import {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
  userProfile,
} from "../controllers/users";
import { celebrate, Joi } from "celebrate";

const router = Router();

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});

router.get("/", getUsers);
router.get("/me", userProfile);
router.get("/:userId", getUserByIdValidator, getUserById);
router.patch("/me", updateUserValidator, updateUser);
router.patch("/me/avatar", updateUserAvatarValidator, updateUserAvatar);

export default router;
