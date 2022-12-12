//@ts-nocheck

import { Router, Request, Response, NextFunction, response } from "express";
import { User } from "../models";

const router = Router();

router.get("/", (req: Request, res: Response, next: Next) => {
  User.find({}).then((result) => (result.length ? res.send(result) : next({})));
});

router.get("/:userId", (req: Request, res: Response, next: NextFunction) => {
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
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
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
});

router.patch("/me", (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
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
});

router.patch(
  "/me/avatar",
  (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;

    User.findByIdAndUpdate(
      req.user._id,
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
  }
);

export default router;
