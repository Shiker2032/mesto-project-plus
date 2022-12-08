import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  link: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  likes: { type: [Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now() },
});

export default CardSchema;
