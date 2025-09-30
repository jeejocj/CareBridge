import { IJWTService } from "../../../domain/interfaces/services/IJWTService"; 
import { JWTPayloadType } from "../../../domain/interfaces/types/JWTPayloadType"; 
import { ITokenCreationUseCase } from "../../../domain/interfaces/useCases/auth/ITokenCreationUseCase"; 

export class TokenCreationUseCase implements ITokenCreationUseCase {
    constructor(private _JWTService: IJWTService) {

    }

    createAccessTokenAndRefreshToken(payload: JWTPayloadType): { accessToken: string; refreshToken: string; } {
        const accessToken = this._JWTService.createAccessToken(payload);
        const refreshToken = this._JWTService.createRefreshToken(payload);
        return { accessToken, refreshToken };
    }
}