import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { IRequest } from "./types";
import usersRouter from "./router/users";
import cardsRouter from "./router/cards";
import errorHandler from "./middleware/errorHandler";
import authHandler from "./middleware/auth";
import { createUser, loginUser } from "./controllers/users";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.post("/signup", createUser);
app.post("/login", loginUser);

app.use(authHandler);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
