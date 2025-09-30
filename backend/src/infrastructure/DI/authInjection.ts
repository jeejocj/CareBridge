import { CacheUserUseCase } from "../../application/useCases/auth/cacheUser";
import { CreateUserUseCase } from "../../application/useCases/auth/createUser";
import { ResendOtpUseCase } from "../../application/useCases/auth/reSendOtp";
import { SendOtpUseCase } from "../../application/useCases/auth/sendOtp";
import { TokenCreationUseCase } from "../../application/useCases/auth/TokenCreation";
import { UserLoginUseCase } from "../../application/useCases/auth/userlogin";
import { VerifyOtpUseCase } from "../../application/useCases/auth/verifyOtp";
import { ForgetPasswordUseCase } from "../../application/useCases/auth/forgetPasswordSendOtp";
import { KeyValueTTLCaching } from "../caching/keyValueTTLCaching";
import { UserRepository } from "../repositories/user/userRepository";
import { OtpEmailContentGenerator } from "../services/email/otpEmailContentGenerator";
import { ResendOtpEmailContentGenerator } from "../services/email/resendOTPEmailContentGenerator";
import { EmailService } from "../services/email/emailService";
import { HashService } from "../services/HashService";
import { JWTService } from "../services/JWTService";
import { OtpService } from "../services/OtpService";
import { AuthController } from "../../presentation/controllers/authController";
import { UserModel } from "../database/model/userModel";


const otpService = new OtpService();
const otpContentGenerator = new OtpEmailContentGenerator();
const emailSerivce = new EmailService();
const userPersistance = new UserRepository(UserModel);
const cacheStorage = new KeyValueTTLCaching();
const sendOtpUseCase = new SendOtpUseCase(otpService, otpContentGenerator, emailSerivce, cacheStorage, userPersistance);

const resendOtpContentGenerator = new ResendOtpEmailContentGenerator();
const resendOtpUseCase = new ResendOtpUseCase(otpService, resendOtpContentGenerator, emailSerivce, cacheStorage);

const hashService = new HashService();
const createUserUseCase = new CreateUserUseCase(userPersistance, hashService);

const verifyOtpUseCase = new VerifyOtpUseCase(cacheStorage);


const jwtService = new JWTService();
const tokenCreationUseCase = new TokenCreationUseCase(jwtService);

const userLoginUseCase = new UserLoginUseCase(userPersistance, hashService);

const cacheUserUseCase = new CacheUserUseCase(cacheStorage);


const forgetPasswordUseCase = new ForgetPasswordUseCase(userPersistance, otpService, emailSerivce, cacheStorage);

export const injectedAuthController = new AuthController(
    tokenCreationUseCase,
    userLoginUseCase,
    cacheUserUseCase,
    verifyOtpUseCase,
    createUserUseCase,
    resendOtpUseCase,
    sendOtpUseCase,
    forgetPasswordUseCase);