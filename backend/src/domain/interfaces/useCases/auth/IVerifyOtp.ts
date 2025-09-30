import { VerifyOtpDTO } from "../../../../application/DTO/auth/VerifyOtpDTO";

export interface IVerifyOtpUseCase{
    verifyOtp(email:VerifyOtpDTO):Promise<boolean>
}