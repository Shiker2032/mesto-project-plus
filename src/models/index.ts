import { model } from "mongoose";
import CardSchema from "./card";
import UserSchema from "./user";

const User = model("user", UserSchema);
const Card = model("card", CardSchema);

export { User, Card };
