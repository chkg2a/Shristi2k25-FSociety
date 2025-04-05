import express from "express";
import { getUserById } from "../controller/user.controller.js";

const userRoute = express.Router();

userRoute.post("/", getUserById); 

export default userRoute;
