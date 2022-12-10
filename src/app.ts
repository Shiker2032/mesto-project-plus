//@ts-nocheck

import express from "express";
import mongoose from "mongoose";
import usersRouter from "./router/usersRouter";
import cardsRouter from "./router/cardsRouter";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "63944e682a200765bf54afc7",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
