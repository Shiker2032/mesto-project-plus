import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ISessionRequest } from "../types";

const handleAuthError = (res: Response) => {
  res.status(401).send({ message: "Ошибка авторизации" });
};

const extractBearerToken = (token: string) => {
  return token.replace("Bearer ", "");
};

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "top-secret-key");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  next(); // пропускаем запрос дальше
};
