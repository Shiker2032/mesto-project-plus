import { NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface IRequest extends Request {
  user?: { _id: string };
}

interface IError {
  message: string;
  status: number;
}

interface IUser {
  email: string;
  password: string;
  name?: string;
  about?: string;
  avatar?: string;
}

interface IUserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string,
    next: NextFunction
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
}

interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

export { IRequest, IError, IUser, IUserModel, ISessionRequest };
