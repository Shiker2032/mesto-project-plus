import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  putCardLike,
  removeCardLike,
} from '../controllers/cards';
import {
  cardIdValidator,
  createCardValidator,
} from '../middlewares/validators';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, putCardLike);
router.delete('/:cardId/likes', cardIdValidator, removeCardLike);

export default router;
