import express from "express";
import { getUserById } from "../controllers/user.controller.js"; // adjust path if needed

const userRoute = express.Router();

userRoute.get("/:id", getUserById); // changed to GET instead of POST

export default userRoute;
