import { IkeyValueTTLCaching } from "../../../domain/interfaces/services/redis/IKeyValueTTLCaching"; 
import { IOtpEmailContentGenerator } from "../../../domain/interfaces/services/email/IOtpEmailContentGenerator"; 
import { IOtpEmailTemplate } from "../../../domain/interfaces/services/email/IOtpEmailTemplate"; 
import { IEmailService } from "../../../domain/interfaces/services/email/IEmailService";
import { IOtpService } from "../../../domain/interfaces/services/IotpService"; 
import { IResendOtpUseCase } from "../../../domain/interfaces/useCases/auth/IResendOtp"; 

export class ResendOtpUseCase implements IResendOtpUseCase {
    constructor(
        private _otpService: IOtpService,
        private _otpmailContentGenerator: IOtpEmailContentGenerator,
        private _emailSerivce: IEmailService,
        private _cacheDatabase: IkeyValueTTLCaching) {

    }

    async resendOtp(email: string): Promise<void> {
        const OTP = this._otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverEmail: email,
            otp: OTP,
            subject: "Resend OTP",
        };

        const content = this._otpmailContentGenerator.generateTemplate(OTP);

        emailTemplate.content = content;
        this._emailSerivce.sendEmail(emailTemplate as Required<IOtpEmailTemplate>);
        this._cacheDatabase.setData(`otp/${email}`, 5 * 60, OTP);
    }
}