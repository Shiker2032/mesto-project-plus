import { Schema } from "mongoose";
import urlRegex from "../utils";
import validator from "validator";

const UserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: (v: string) => validator.isEmail(v),
    },
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: string) => urlRegex.test(value),
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

export default UserSchema;
