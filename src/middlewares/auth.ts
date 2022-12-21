import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnathorizedError from '../errors/unathorized-err';
import { ISessionRequest } from '../types';

const handleAuthError = () => {
  throw new UnathorizedError('Ошибка авторизации');
};

const extractBearerToken = (token: string) => token.replace('Bearer ', '');

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'top-secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;
  return next(); // пропускаем запрос дальше
};
