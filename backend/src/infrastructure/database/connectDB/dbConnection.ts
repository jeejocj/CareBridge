import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class ConnectMongoDB {
  async connectDB():Promise<void> {
    try {
      const mongoUrl = process.env.MONGODB_URL;

      if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in environment variables");
      }

      await mongoose.connect(mongoUrl);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1); 
    }
  }
}
