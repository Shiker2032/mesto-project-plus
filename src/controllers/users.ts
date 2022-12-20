import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IRequest } from '../types';
import { User } from '../models';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).then((result) => (result.length ? res.send(result) : next({})));
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .then((result) => (result
      ? res.send(result)
      : next({
        message: 'Пользователь по указанному _id не найден',
        status: 404,
      })))
    .catch(() => next({}));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(req.body.password, salt))
    .then((hashed) => User.create({ ...req.body, password: hashed }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({
          message: 'Переданы некорректные данные при создании пользователя',
          status: 400,
        });
      } else if (err.code === 11000) {
        next({
          message: 'Пользователь с такой почтой уже зарегистрирован',
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
  next: NextFunction,
) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((result) => (result
      ? res.send(result)
      : next({
        message: 'Пользователь с указанным _id не найден',
        status: 404,
      })))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next({
          message: 'Переданы некорректные данные при обновлении профиля',
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
  next: NextFunction,
) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((result) => (result
      ? res.send(result)
      : next({
        message: 'Пользователь с указанным _id не найден',
        status: 404,
      })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({
          message: 'Переданы некорректные данные при обновлении аватара',
          status: 400,
        });
      } else {
        next({});
      }
    });
};

export const loginUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password, next);
  if (user) {
    const token = jwt.sign({ _id: user._id }, 'top-secret-key', {
      expiresIn: '7d',
    });
    res.send(token);
  }
};
export const userProfile = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  User.findOne({ _id: req.user?._id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next({ message: 'Пользователь не найден', status: 400 });
      }
    })
    .catch((err) => {
      next({});
    });
};
