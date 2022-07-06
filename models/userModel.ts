import { Schema, model, models } from "mongoose";

export interface element {
  to_do: string;
  date: string;
  time: string;
}

export interface User {
  username: string;
  password: string;
  element: element[];
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  element: [{ to_do: String, date: String, time: String }],
});

const UserModel = models.Users || model("Users", userSchema);

export default UserModel;
