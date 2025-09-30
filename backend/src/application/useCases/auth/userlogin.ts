import { LoginDTO } from "../../DTO/auth/LoginDTO";
import { LoginResponseDTO } from "../../DTO/auth/LoginDTO";
import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository";
import { IHashService } from "../../../domain/interfaces/services/IHashService";
import { IUserLoginUseCase } from "../../../domain/interfaces/useCases/auth/IUserLogin";
import { userEntity } from "../../../domain/entities/userEntity/userEntity";
import { AuthMapper } from "../../mappers/AuthMapper";


export class UserLoginUseCase implements IUserLoginUseCase {
    private _userPersistance: IUserRepository;
    private _hashService: IHashService;

    constructor(userPersistance: IUserRepository, hashService: IHashService) {
        this._userPersistance = userPersistance;
        this._hashService = hashService;
    }

    async userLogin({ email, password }: LoginDTO): Promise<LoginResponseDTO> {
        
        const user: userEntity | null = await this._userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isBlocked) {
            throw new Error("User is blocked by admin");
        }

        const verifyPassword = await this._hashService.compare(password, user.password);
        if (!verifyPassword) {
            throw new Error("Invalid Password");
        }

        return AuthMapper.EntityToLoginResponseDTO(user);
    }
}
