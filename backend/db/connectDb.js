import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb=async()=>{
    try {
        const com=await mongoose.connect(process.env.MONGO_URL);
        console.log(`db connected ${com.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}