import { Request, Response } from "express";
import { HTTPStatus } from "../../shared/constants/HTTPStatus";
import { ITokenCreationUseCase } from "../../domain/interfaces/useCases/auth/ITokenCreationUseCase";
import { IUserLoginUseCase } from "../../domain/interfaces/useCases/auth/IUserLogin";
import { ICacheUserUseCase } from "../../domain/interfaces/useCases/auth/ICacheUser";
import { IVerifyOtpUseCase } from "../../domain/interfaces/useCases/auth/IVerifyOtp";
import { ICreateUserUseCase } from "../../domain/interfaces/useCases/auth/ICreateUser";
import { IResendOtpUseCase } from "../../domain/interfaces/useCases/auth/IResendOtp";
import { IsendOtpUseCase } from "../../domain/interfaces/useCases/auth/ISendOtp";
import { IForgetPasswordSendOtpUseCase } from "../../domain/interfaces/useCases/auth/IForgetPasswordSendOtp";

export class AuthController {
    constructor(
        private _tokenCreatetionUseCase: ITokenCreationUseCase,
        private _loginUseCase: IUserLoginUseCase,
        private _cacheUserUseCase: ICacheUserUseCase,
        private _verifyOtpUseCase: IVerifyOtpUseCase,
        private _createUserUseCase: ICreateUserUseCase,
        private _resendOtpUseCase: IResendOtpUseCase,
        private _sendOtpUseCase: IsendOtpUseCase,
        private _forgetPasswordSendOtpUseCase: IForgetPasswordSendOtpUseCase) {

    }


    async UserLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this._loginUseCase.userLogin({email, password});

            const token = this._tokenCreatetionUseCase.createAccessTokenAndRefreshToken({ userId: user._id, role: "user" });
            res.cookie("RefreshToken", token.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            this._cacheUserUseCase.cacheUser(user);

            res.status(HTTPStatus.OK).json({ "message": "User Login Successful", user, accessToken: token.accessToken });

        } catch (error) {
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while login", error: (error instanceof Error ? error.message : "Error while validation user") });
        }
    }

    async RegisterUser(req: Request, res: Response) {
        try {
            const { userData, otp } = req.body;
            
            const otpVerified = await this._verifyOtpUseCase.verifyOtp({email: userData.email, otp});

            if (!otpVerified) {
                res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid Otp" });
                return;
            }

            const user = await this._createUserUseCase.createUser(userData);
            res.status(HTTPStatus.CREATED).json({ message: "User Created Successfully", data: user });

        } catch (error) {

            console.log("Error while creating user", error);

            res.status(HTTPStatus.BAD_REQUEST).json({
                message: "Errow while creating user ",
                error: (error instanceof Error ? error.message : "")
            });
        }
    }


    async ResendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email is required");
            }


            this._resendOtpUseCase.resendOtp(email);
            res.status(HTTPStatus.OK).json({ message: "OTP Resended Successfully" });

        } catch (error) {
            console.log("Error while resending otp", error);
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while resening otp", error: error instanceof Error ? error.message : "Error in resending otp" });
        }
    }

    async SendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email not recieved");
            }
            await this._sendOtpUseCase.sendOtp(email);
            res.status(HTTPStatus.OK).json({ message: "OTP send successfully " });
        } catch (error) {
            console.log("Error while sending otp");
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while sending otp", error: error instanceof Error ? error.message : "otp Error" });
        }
    }

    async ForgetPasswordSendOtp(req: Request, res: Response) {
        try {
            const {email} = req.body;
            await this._forgetPasswordSendOtpUseCase.sendOtp(email);
            res.status(HTTPStatus.OK).json({message:"Otp Send Successfully"});

        } catch (error) {
            console.log("Error while sending otp");
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while sending otp", error: error instanceof Error ? error.message : "otp Error" });
        }
    }

}