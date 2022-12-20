import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../types';
import { Card } from '../models';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((result) => (result.length ? res.send(result) : next({})))
    .catch(() => next({}));
};

export const createCard = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.create({ ...req.body, owner: req.user?._id })
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({
          message: 'Переданы некорректные данные при создании карточки',
          status: 400,
        });
      } else {
        next({});
      }
    });
};

export const deleteCard = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findOne({ _id: req.params.cardId });
    if (!card) {
      return next({
        message: 'Карточка с указанным _id не найдена',
        status: 400,
      });
    }
    if (card.owner?.valueOf() !== req.user?._id) {
      return next({
        message: 'Вы не можете удалить чужую карточку',
        status: 400,
      });
    }
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    return res.send({ message: 'Карточка удалена успешно', data: deletedCard });
  } catch (err) {
    return next({});
  }
};

export const putCardLike = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { runValidators: true, new: true },
  )
    .then((result) => (result
      ? res.send(result)
      : next({
        message: 'Передан несуществующий _id карточки.',
        status: 400,
      })))
    .catch(() => next({}));
};

export const removeCardLike = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  ).then((result) => (result
    ? res.send(result)
    : next({ message: 'Карточка с указанным _id не найдена', status: 404 })));
};
