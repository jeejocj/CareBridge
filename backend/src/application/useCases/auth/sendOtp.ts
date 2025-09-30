import { IOtpEmailTemplate } from "../../../domain/interfaces/services/email/IOtpEmailTemplate"; 
import { IOtpEmailContentGenerator } from "../../../domain/interfaces/services/email/IOtpEmailContentGenerator"; 
import { IOtpService } from "../../../domain/interfaces/services/IotpService"; 
import { IsendOtpUseCase } from "../../../domain/interfaces/useCases/auth/ISendOtp";
import { IEmailService } from "../../../domain/interfaces/services/email/IEmailService"; 
import { IkeyValueTTLCaching } from "../../../domain/interfaces/services/redis/IKeyValueTTLCaching"; 
import { IUserRepository } from "../../../domain/interfaces/repository/user/IUserRepository"; 

export class SendOtpUseCase implements IsendOtpUseCase {
    private _otpService: IOtpService;
    private _otpTemplateGenerator: IOtpEmailContentGenerator;
    private _emailService: IEmailService;
    private _cacheStorage: IkeyValueTTLCaching;
    private _userPersistance: IUserRepository;

    constructor(otpService: IOtpService, otpTemplateGenerator: IOtpEmailContentGenerator, emailService: IEmailService, cacheStorage: IkeyValueTTLCaching, userPersistance:IUserRepository) {
        this._otpService = otpService;
        this._otpTemplateGenerator = otpTemplateGenerator;
        this._cacheStorage = cacheStorage;
        this._emailService = emailService;
        this._userPersistance = userPersistance;
    }
    async sendOtp(email: string): Promise<void> {

        const existingEmail = await this._userPersistance.findByEmail(email);
        if(existingEmail){
            throw new Error("Email is already used by another user");
        }

        const OTP = this._otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverEmail: email,
            subject: "OTP",
            otp: OTP
        };

        emailTemplate.content = this._otpTemplateGenerator.generateTemplate(OTP);
        this._emailService.sendEmail(emailTemplate as Required<IOtpEmailTemplate>);
        this._cacheStorage.setData(`otp/${email}`, 2 * 60, OTP);
    }
}