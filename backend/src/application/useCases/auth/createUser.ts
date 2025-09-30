import { userEntity } from "../../../domain/entities/userEntity/userEntity"; 
import { CreateUserDTO, UserResponseDTO } from "../../DTO/auth/CreateUserDTO"; 
import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository"; 
import { IHashService } from "../../../domain/interfaces/services/IHashService"; 
import { ICreateUserUseCase } from "../../../domain/interfaces/useCases/auth/ICreateUser";
import { AuthMapper } from "../../mappers/AuthMapper";

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly _userRepository: IUserRepository;
  private readonly _hashService: IHashService;

  constructor(userRepository: IUserRepository, hashService: IHashService) {
    this._userRepository = userRepository;
    this._hashService = hashService;
  }

  async createUser(userDTO: CreateUserDTO): Promise<UserResponseDTO> {

    const existingUser: userEntity | null = await this._userRepository.findByEmail(userDTO.email);
    if (existingUser) {
      throw new Error("User with same email already exists");
    }

    const userEntity = AuthMapper.createUserDTOToEntity(userDTO);

    if (!userEntity.password) {
      throw new Error("Password is required");
    }
    userEntity.password = await this._hashService.hash(userEntity.password);

    const newUser = await this._userRepository.create(userEntity);
    if (!newUser) {
      throw new Error("Error while creating new user");
    }

    return AuthMapper.EntityToUserResponseDTO(newUser);
  }
}
