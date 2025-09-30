import { LoginResponseDTO } from "../../DTO/auth/LoginDTO";
import { IkeyValueTTLCaching } from "../../../domain/interfaces/services/redis/IKeyValueTTLCaching"; 
import { ICacheUserUseCase } from "../../../domain/interfaces/useCases/auth/ICacheUser";

export class CacheUserUseCase implements ICacheUserUseCase {
  private readonly _cacheDatabase: IkeyValueTTLCaching;

  constructor(cacheDatabase: IkeyValueTTLCaching) {
    this._cacheDatabase = cacheDatabase;
  }

  async cacheUser(user: LoginResponseDTO): Promise<void> {
    if (!user || !user._id) {
      throw new Error("Invalid user data: _id is required to cache user.");
    }

    const cacheKey = `user/${user._id}`;
    const ttlInSeconds = 15 * 60; 

    await this._cacheDatabase.setData(cacheKey, ttlInSeconds, JSON.stringify(user));
  }
}
