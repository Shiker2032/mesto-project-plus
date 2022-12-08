import { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  about: { type: String, minLength: 2, maxLength: 200, required: true },
  avatar: { type: String, required: true },
});

export default UserSchema;
