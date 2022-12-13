import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import usersRouter from "./router/users";
import cardsRouter from "./router/cards";
import errorHandler from "./middleware/errorHandler";
import { IRequest } from "types";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req: IRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "63987f351ae1a5c53f5a453f",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
