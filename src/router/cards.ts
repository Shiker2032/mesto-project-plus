import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  putCardLike,
  removeCardLike,
} from "../controllers/cards";
import { celebrate, Joi } from "celebrate";

const router = Router();

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri(),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
});

router.get("/", getCards);
router.post("/", createCardValidator, createCard);
router.delete("/:cardId", cardIdValidator, deleteCard);
router.put("/:cardId/likes", cardIdValidator, putCardLike);
router.delete("/:cardId/likes", cardIdValidator, removeCardLike);

export default router;
