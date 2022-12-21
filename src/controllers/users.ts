import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IRequest } from '../types';
import { User } from '../models';
import BadRequestError from '../errors/bad-req-err';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict-err';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((result) => (result.length ? res.send(result) : next({})))
    .catch((err) => next(err));
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(result);
    })
    .catch((err) => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(req.body.password, salt))
    .then((hashed) => User.create({ ...req.body, password: hashed }))
    .then((user) => {
      const {
        email, name, about, avatar,
      } = user;
      res.send({
        email, name, about, avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } if (err.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      }
      return next(err);
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
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
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
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

export const loginUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password, next);
    if (user) {
      const token = jwt.sign({ _id: user._id }, 'top-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    }
  } catch (err) {
    next(err);
  }
};
export const userProfile = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  User.findOne({ _id: req.user?._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
