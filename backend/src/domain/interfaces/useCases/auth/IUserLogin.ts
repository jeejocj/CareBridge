import { LoginDTO } from "../../../../application/DTO/auth/LoginDTO";
import {LoginResponseDTO } from "../../../../application/DTO/auth/LoginDTO";

export interface IUserLoginUseCase {
    userLogin(user:LoginDTO): Promise<LoginResponseDTO>
}