import { Request, Response, NextFunction } from "express";
import { IRequest } from "types";
import { User } from "../models";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).then((result) => (result.length ? res.send(result) : next({})));
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.params.userId)
    .then((result) =>
      result
        ? res.send(result)
        : next({
            message: "Пользователь по указанному _id не найден",
            status: 404,
          })
    )
    .catch((err) => next({}));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next({
          message: "Переданы некорректные данные при создании пользователя",
          status: 400,
        });
      } else {
        next({});
      }
    });
};

export const updateUser = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .then((result) =>
      result
        ? res.send(result)
        : next({
            message: "Пользователь с указанным _id не найден",
            status: 404,
          })
    )
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next({
          message: "Переданы некорректные данные при обновлении профиля",
          status: 400,
        });
      } else {
        next({});
      }
    });
};

export const updateUserAvatar = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { runValidators: true, new: true }
  )
    .then((result) =>
      result
        ? res.send(result)
        : next({
            message: "Пользователь с указанным _id не найден",
            status: 404,
          })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next({
          message: "Переданы некорректные данные при обновлении аватара",
          status: 400,
        });
      } else {
        next({});
      }
    });
};
