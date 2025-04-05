import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import authRoute from "./route/auth.route.js";
import Check from "./route/check.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app=express();

const PORT=process.env.PORT|| 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/verify",Check);

app.listen(PORT,async()=>{
    await connectDb();
    console.log(`server is running on port ${PORT}`);
})