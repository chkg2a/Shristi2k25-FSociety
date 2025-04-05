import express from "express";
import { signup,login } from "../controller/auth.controller.js";
import { logout } from "../controller/auth.controller.js";

const authRoute=express.Router();


authRoute.post("/signup",signup);
authRoute.post("/login",login);
authRoute.post("/logout",logout);
export default authRoute;
