import { IJWTService } from "../../domain/interfaces/services/IJWTService";
import { sign, verify } from "jsonwebtoken";
import { JWTPayloadType } from "../../domain/interfaces/types/JWTPayloadType";

export class JWTService implements IJWTService {
  createAccessToken(payload: JWTPayloadType): string {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Access Token not provided in env");
    }

    return sign(payload, secretKey, { expiresIn: "15m" });
  }

  createRefreshToken(payload: JWTPayloadType): string {
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Refresh Token not provided in env");
    }

    return sign(payload, secretKey, { expiresIn: "7d" }); 
  }

  verifyAccessToken(token: string): JWTPayloadType | null {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Access Token not provided in env");
    }

    try {
      return verify(token, secretKey) as JWTPayloadType;
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): JWTPayloadType | null {
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Refresh Token not provided in env");
    }

    try {
      return verify(token, secretKey) as JWTPayloadType;
    } catch {
      return null;
    }
  }
}
