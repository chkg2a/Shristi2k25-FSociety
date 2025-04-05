import express from "express";
import {check} from "../controller/check.controller.js";
import { verifyToken } from "../middlwares/verifyToken.js";

const Check=express.Router();

Check.post("/check",verifyToken,check);



export default Check;