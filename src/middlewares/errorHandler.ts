import { NextFunction, Request, Response } from 'express';
import { IError } from '../types';

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode = 500 } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
};

export default errorHandler;
