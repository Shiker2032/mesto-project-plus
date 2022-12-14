import { NextFunction, Request, Response } from "express";
import { IError } from "types";

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message = "На сервере произошла ошибка", status } = err;
  res.status(status ? status : 500).send({ message: message });
};

export default errorHandler;
