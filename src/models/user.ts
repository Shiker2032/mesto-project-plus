import { Schema } from "mongoose";
import urlRegex from "../utils";
import validator from "validator";
import { IUser, IUserModel } from "types";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

const UserSchema = new Schema<IUser, IUserModel>({
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
    select: false,
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

UserSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string,
  next: NextFunction
) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    return next({ message: "Неправильные почта или пароль", status: 400 });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return next({ message: "Неправильные почта или пароль", status: 400 });
  }
  return user;
};

export default UserSchema;
