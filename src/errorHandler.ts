//@ts-nocheck

import { NextFunction, Request, Response } from "express";

const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const { message = "Внтуренняя ошибка", status } = err;
  res.status(status ? status : 500).send({ message: message });
};

export default errorHandler;
