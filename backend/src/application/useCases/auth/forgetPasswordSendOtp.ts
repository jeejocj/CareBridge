import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository";
import { IkeyValueTTLCaching } from "../../../domain/interfaces/services/redis/IKeyValueTTLCaching"; 
import { IBaseEmailTemplate } from "../../../domain/interfaces/services/email/IBaseEmailTemplate"; 
import { IOtpEmailTemplate } from "../../../domain/interfaces/services/email/IOtpEmailTemplate"; 
import { IEmailService } from "../../../domain/interfaces/services/email/IEmailService";
import { IOtpService } from "../../../domain/interfaces/services/IotpService"; 
import { IForgetPasswordSendOtpUseCase } from "../../../domain/interfaces/useCases/auth/IForgetPasswordSendOtp";

export class ForgetPasswordUseCase implements IForgetPasswordSendOtpUseCase {
    constructor(private _userPersistance: IUserRepository,
        private _otpService: IOtpService,
        private _emailSerivce: IEmailService,
        private _cacheService: IkeyValueTTLCaching) {

    }

    async sendOtp(email: string): Promise<void> {
        const user = await this._userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("User with this email dont exist");
        }

        const OTP = this._otpService.generateOtp();

        const Mail: IOtpEmailTemplate = {
            receiverEmail: email,
            otp: OTP,
            subject: "This is forget Password Otp",
        };

        this._cacheService.setData(`forgetOtp/${email}`, 2 * 60, OTP);

        this._emailSerivce.sendEmail(Mail as Required<IBaseEmailTemplate>);
    }
}