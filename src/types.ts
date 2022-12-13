import { Request } from "express";

interface IRequest extends Request {
  user?: { _id: string };
}

interface IError {
  message: string;
  status: number;
}

export { IRequest, IError };
