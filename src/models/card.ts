import { Schema } from 'mongoose';
import urlRegex from '../utils';

const CardSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (value: string) => urlRegex.test(value),
    },
  },
  owner: { type: Schema.Types.ObjectId, required: true },
  likes: { type: [Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now() },
});

export default CardSchema;
