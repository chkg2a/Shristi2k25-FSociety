import express from "express";
import { getUserById } from "../controller/user.controller.js";

const userRoute = express.Router();

userRoute.get("/:id", getUserById); // changed to GET instead of POST

export default userRoute;
