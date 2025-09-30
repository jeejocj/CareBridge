import  { model,ObjectId, Document } from "mongoose";
import { userEntity } from "../../../domain/entities/userEntity/userEntity";
import { userSchema } from "../schema/userSchema";

export interface IUserModel extends Omit<userEntity, "_id">, Document {
  _id: ObjectId;
}
export const UserModel = model<IUserModel>("user",userSchema);

