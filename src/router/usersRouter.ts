//@ts-nocheck

import { Router, Request, Response } from "express";
import { User } from "../models";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.find({});
  res.send(users);
});

router.get("/:userId", async (req: Request, res: Response) => {
  const result = await User.findById(req.params.userId);
  res.send(result);
});

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.send(user);
});

router.patch("/me", async (req: Request, res: Response) => {
  const { name, about } = req.body;
  const user = await User.find({ _id: req.user._id }).update({ name, about });
  res.send(user);
});

router.patch("/me/avatar", async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const user = await User.find({ _id: req.user._id }).update({ avatar });
  res.send(user);
});

export default router;
