import { IkeyValueTTLCaching } from "../../../domain/interfaces/services/redis/IKeyValueTTLCaching"; 
import { IVerifyOtpUseCase } from "../../../domain/interfaces/useCases/auth/IVerifyOtp"; 
import { VerifyOtpDTO } from "../../DTO/auth/VerifyOtpDTO";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    private _cacheStorage: IkeyValueTTLCaching;

    constructor(cacheStorage: IkeyValueTTLCaching) {
        this._cacheStorage = cacheStorage;
    }

    async verifyOtp({email,otp}:VerifyOtpDTO): Promise<boolean> {
        const cachecdOtp = await this._cacheStorage.getData(`otp/${email}`);
        if (!cachecdOtp) {
            throw new Error("OTP Expired or OTP not requested");
        }
        const otpVerified = otp === cachecdOtp;
        if (otpVerified) {
            await this._cacheStorage.deleteData(`otp/${email}`);
        }

        return otpVerified;
    }
}