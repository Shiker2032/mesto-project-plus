import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import usersRouter from "./router/users";
import cardsRouter from "./router/cards";
import errorHandler from "./middleware/errorHandler";
import authHandler from "./middleware/auth";
import { createUser, loginUser } from "./controllers/users";
import { errors } from "celebrate";
import { celebrate, Joi } from "celebrate";

import { errorLogger, requestLogger } from "./middleware/logger";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
  }),
});

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

app.use(requestLogger);

app.post("/signup", createUserValidator, createUser);
app.post("/login", loginUserValidator, loginUser);

app.use(authHandler);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
