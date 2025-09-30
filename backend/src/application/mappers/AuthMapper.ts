import { userEntity } from "../../domain/entities/userEntity/userEntity";
import { CreateUserDTO } from "../DTO/auth/CreateUserDTO";
import { UserResponseDTO } from "../DTO/auth/CreateUserDTO";
import { LoginResponseDTO } from "../DTO/auth/LoginDTO";  
import { IUserModel } from "../../infrastructure/database/model/userModel";
import { Types } from "mongoose";


export class AuthMapper {
  static createUserDTOToEntity(dto: CreateUserDTO): userEntity {
    return {
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      role: dto.role,
    };
  }

  static EntityToUserResponseDTO(dto:userEntity): UserResponseDTO {
    return {
      _id: dto._id ? String(dto._id) : "",
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      role: dto.role,
      profileImage: dto.profileImage,
    };
  }


  static EntityToLoginResponseDTO(dto:userEntity): LoginResponseDTO {
    return {
      _id: dto._id ? String(dto._id) : "",
      fullName: dto.fullName,
      email: dto.email,
      role: dto.role,
      profileImage: dto.profileImage,
    };
  }


static toMongooseDocument(user: userEntity) {
    return {
      _id: user._id ? new Types.ObjectId(user._id) : undefined,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin
    };
  }

  static fromMongooseDocument(doc: IUserModel): userEntity {
    return {
      _id: doc._id.toString(),
      fullName: doc.fullName,
      email: doc.email,
      password: doc.password,
      phone: doc.phone,
      role: doc.role,
      profileImage: doc.profileImage,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      lastLogin: doc.lastLogin
    };
  }

}
