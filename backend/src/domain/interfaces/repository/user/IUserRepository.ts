import { userEntity } from "../../../entities/userEntity/userEntity";

export interface IUserRepository {
  findByEmail(email: string): Promise<userEntity | null>;
  create(user: userEntity): Promise<userEntity>;
}
