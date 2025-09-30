import express, { urlencoded,type Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import { Auth_router } from "./presentation/routes/authRoute";
import { ConnectMongoDB } from "./infrastructure/database/connectDB/dbConnection";


class ExpressApp {
  private _app: Express;
  private database: ConnectMongoDB;

  constructor() {
    this._app = express();

    this._app.use(express.json());
    this._app.use(urlencoded({ extended: true }));

    this._setRoutes();

    this.database = new ConnectMongoDB();
    this.database.connectDB();
  }

  private _setRoutes() {
    // const router = new Auth_router();
    this._app.use("/api/auth",new Auth_router().get_router());
  }

  listen() {
    const PORT = process.env.PORT ?? 5000;
    this._app.listen(PORT, (err) =>{
    if (err) {
        console.log("error while starting server");
        throw err;
      }
        console.log(`Server running on http://localhost:${PORT}`);
    }
      
    );
  }
}

const _app = new ExpressApp();
_app.listen();
