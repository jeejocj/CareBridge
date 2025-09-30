import { CreateUserDTO } from "../../../../application/DTO/auth/CreateUserDTO";
import { UserResponseDTO } from "../../../../application/DTO/auth/CreateUserDTO";


export interface ICreateUserUseCase {
    createUser(user: CreateUserDTO): Promise<UserResponseDTO>
}