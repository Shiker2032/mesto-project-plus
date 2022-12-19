import { model } from "mongoose";
import { IUser, IUserModel } from "../types";
import CardSchema from "./card";
import UserSchema from "./user";

const User = model<IUser, IUserModel>("user", UserSchema);
const Card = model("card", CardSchema);

export { User, Card };
