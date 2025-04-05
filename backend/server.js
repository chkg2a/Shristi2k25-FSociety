import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import authRoute from "./route/auth.route.js";
import userRoute from "./route/user.route.js";
import Check from "./route/check.route.js";
import cookieParser from "cookie-parser";
import routerAdmin from "./route/admin.route.js";
import routerCredit from "./route/credict.route.js";
import routerDocument from "./route/document.route.js";
import routerMatch from "./route/matching.route.js";
import cors from "cors";
import { scheduleCreditReset } from "./service/creditService.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Initialize credit reset scheduler
scheduleCreditReset();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/verify", Check);
app.use("/api/v1/admin", routerAdmin);
app.use("/api/v1/credit", routerCredit);
app.use("/api/v1/document", routerDocument);
app.use("/api/v1/match", routerMatch);

app.listen(PORT, async () => {
    await connectDb();
    console.log(`server is running on port ${PORT}`);
});
