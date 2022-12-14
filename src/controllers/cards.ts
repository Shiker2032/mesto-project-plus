import { NextFunction, Request, Response } from "express";
import { IRequest } from "types";
import { Card } from "../models";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((result) => (result.length ? res.send(result) : next({})))
    .catch((err) => next({}));
};

export const createCard = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  Card.create({ ...req.body, owner: req.user?._id })
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next({
          message: "Переданы некорректные данные при создании карточки",
          status: 400,
        });
      } else {
        next({});
      }
    });
};

export const deleteCard = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  Card.findOneAndDelete(
    { _id: req.params.cardId, owner: req.user?._id },
    { runValidators: true, new: true }
  )
    .then((result) =>
      result
        ? res.send(result)
        : next({ message: "Карточка с указанным _id не найдена" })
    )
    .catch((err) => next({}));
};

export const putCardLike = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { runValidators: true, new: true }
  )
    .then((result) =>
      result
        ? res.send(result)
        : next({
            message: "Передан несуществующий _id карточки.",
            status: 400,
          })
    )
    .catch((err) => next({}));
};

export const removeCardLike = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true }
  ).then((result) =>
    result
      ? res.send(result)
      : next({ message: "Карточка с указанным _id не найдена", status: 404 })
  );
};
