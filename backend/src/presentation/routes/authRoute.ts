import { Request, Response, Router } from "express";
import { injectedAuthController } from "../../infrastructure/DI/authInjection";

export class Auth_router {
    private _router: Router;
    constructor() {
        this._router = Router();
        this._setRoute();
    }

    private _setRoute() {
        this._router.post("/signup", (req: Request, res: Response) => {
            injectedAuthController.SendOtp(req, res);
        });

        this._router.post("/resendOtp", (req:Request, res:Response)=>{
            injectedAuthController.ResendOtp(req,res);
        });

        this._router.post("/verify", (req: Request, res: Response) => {
            injectedAuthController.RegisterUser(req, res);
        });

        this._router.post("/login", (req: Request, res: Response) => {
            injectedAuthController.UserLogin(req, res);
        });


        this._router.post("/forget", (req:Request, res:Response)=>{
            injectedAuthController.ForgetPasswordSendOtp(req, res);
        });
    }

    public get_router() {
        return this._router;
    }
}