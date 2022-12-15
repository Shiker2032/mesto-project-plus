import { Request, Response } from 'express';
import { IError } from '../types';

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
) => {
  const { message = 'На сервере произошла ошибка', status } = err;
  res.status(status || 500).send({ message });
};

export default errorHandler;
