import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = (res: Response) => {
  res.status(401).send({ message: "Ошибка авторизации" });
};

const extractBearerToken = (token: string) => {
  return "Функционал пока еще не реализован";
};

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   return handleAuthError(res);
  // }

  // const token = extractBearerToken(authorization);
  // let payload;

  // try {
  //   payload = jwt.verify(token, "super-strong-secret");
  // } catch (err) {
  //   return handleAuthError(res);
  // }

  // req.user = payload; // записываем пейлоуд в объект запроса

  console.log("auth middleware");

  next(); // пропускаем запрос дальше
};
