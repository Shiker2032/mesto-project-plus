//@ts-nocheck

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Card, User } from "./models/index";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "639057b25238d9c7d53c867b",
  };
  next();
});

app.get("/", async (req: Request, resp: Response) => {
  resp.send("Welcome");
});

//Users ====================================================

app.get("/users", async (req: Request, resp: Response) => {
  const users = await User.find({});
  resp.send(users);
});

app.get("/users/:userId", async (req: Request, resp: Response) => {
  const user = await getUserById(req.params.userId);
  resp.send(user);
});

app.post("/users", async (req: Request, resp: Response) => {
  const user = await createUser(req.body);
  resp.send(user);
});

async function createUser(user) {
  const user = await User.create({
    name: "name2",
    about: "about2",
    avatar: "link2",
  });
  await user.save();
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

//Cards ====================================================

app.get("/cards", async (req: Request, resp: Response) => {
  const cards = await Card.find({});
  resp.send(cards);
});

app.post("/cards", async (req: Request, resp: Response) => {
  const { _id } = req.user;
  const card = await Card.create({ ...req.body, owner: _id });
  resp.send(card);
});

app.delete("/cards/:cardId", async (req: Request, resp: Response) => {
  const result = await Card.findByIdAndDelete(req.params.cardId);
  resp.send(result);
});

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
