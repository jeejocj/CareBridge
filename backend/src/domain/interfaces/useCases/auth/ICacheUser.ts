import { LoginResponseDTO } from "../../../../application/DTO/auth/LoginDTO";

export interface ICacheUserUseCase {
    cacheUser(user: LoginResponseDTO): void
}