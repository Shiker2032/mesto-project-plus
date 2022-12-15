import { Schema } from 'mongoose';
import urlRegex from '../utils';

const UserSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: string) => urlRegex.test(value),
    },
  },
});

export default UserSchema;
