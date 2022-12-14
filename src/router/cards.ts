import {
  createCard,
  deleteCard,
  getCards,
  putCardLike,
  removeCardLike,
} from "../controllers/cards";
import { Router } from "express";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", putCardLike);
router.delete("/:cardId/likes", removeCardLike);

export default router;
