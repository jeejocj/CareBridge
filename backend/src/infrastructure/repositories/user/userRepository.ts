import { Model } from "mongoose";
import { IUserModel } from "../../../infrastructure/database/model/userModel";
import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository";
import { userEntity } from "../../../domain/entities/userEntity/userEntity";
import { AuthMapper } from "../../../application/mappers/AuthMapper";

export class UserRepository implements IUserRepository {
  constructor(protected _model: Model<IUserModel>) {}

  async create(user: userEntity): Promise<userEntity> {
    const docData = AuthMapper.toMongooseDocument(user); 
    const doc = await this._model.create(docData);
    return AuthMapper.fromMongooseDocument(doc); 
  }

  async findByEmail(email: string): Promise<userEntity | null> {
    const doc = await this._model.findOne({ email });
    return doc ? AuthMapper.fromMongooseDocument(doc) : null;
  }


}















// import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository";
// import { userEntity } from "../../../domain/entities/userEntity/userEntity";
// import { UserModel,IUserModel } from "../../database/model/userModel";
// import { AuthMapper } from "../../../application/mappers/AuthMapper";

// export class UserRepository implements IUserRepository {
//   async create(user: userEntity): Promise<userEntity> {
//     const docData = AuthMapper.toMongooseDocument(user);
//     const doc = await UserModel.create(docData);
//     return AuthMapper.fromMongooseDocument(doc);
//   }

//   async findByEmail(email: string): Promise<userEntity | null> {
//   const doc: IUserModel | null = await UserModel.findOne({ email }).exec();
//   if (!doc) return null;
//   return AuthMapper.fromMongooseDocument(doc);
//   }

// }
