import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../types';
import { Card } from '../models';
import BadRequestError from '../errors/bad-req-err';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((result) => (result.length ? res.send(result) : next({})))
    .catch((err) => next(err));
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
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
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
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    if (card.owner?.valueOf() !== req.user?._id) {
      throw new ForbiddenError('Вы не можете удалить чужую карточку');
    }
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    return res.send({ message: 'Карточка удалена успешно', data: deletedCard });
  } catch (err) {
    return next(err);
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
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(result);
    })
    .catch((err) => next(err));
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
  ).then((result) => {
    if (!result) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    res.send(result);
  }).catch((err) => next(err));
};
