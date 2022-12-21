import { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from '../types';
import urlRegex from '../utils/utils';
import BadRequestError from '../errors/bad-req-err';

const UserSchema = new Schema<IUser, IUserModel>({
  email: {
    type: String,
    validate: {
      validator: (v: string) => validator.isEmail(v),
    },
    required: true,
    unique: true,
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
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: string) => urlRegex.test(value),
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

UserSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string,
) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new BadRequestError('Неправильные почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new BadRequestError('Неправильные почта или пароль');
  }
  return user;
};

export default UserSchema;
