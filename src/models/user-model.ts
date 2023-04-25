import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  name:string;
  surname:string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}

const UserScheme = new Schema<IUser>({
  name:{ type: String, required: true },
  surname:{type: String, required:true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export const UserModel: Model<IUser> = mongoose.model("User", UserScheme);
