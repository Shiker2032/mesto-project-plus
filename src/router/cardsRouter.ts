//@ts-nocheck

import { Router, Request, Response } from "express";
import { Card } from "../models";

const router = Router();

router.get("/", async (req: Request, resp: Response) => {
  const cards = await Card.find({});
  resp.send(cards);
});

router.post("/", async (req: Request, resp: Response) => {
  const { _id } = req.user;
  const card = await Card.create({ ...req.body, owner: _id });
  resp.send(card);
});

router.delete("/:cardId", async (req: Request, resp: Response) => {
  const result = await Card.findOneAndDelete({
    _id: req.params.cardId,
    owner: req.user._id,
  });
  resp.send(result);
});

router.put("/:cardId/likes", async (req: Request, resp: Response) => {
  const cardId = req.params.cardId;
  const result = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );
  resp.send(result);
});

router.delete("/:cardId/likes", async (req: Request, resp: Response) => {
  const cardId = req.params.cardId;
  const result = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
  resp.send(result);
});

export default router;
