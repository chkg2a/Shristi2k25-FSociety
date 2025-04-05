import express from "express";
import { verifyToken } from "../middlwares/verifyToken.js";
import { getUserDetails } from "../middlwares/userdetails.js";
import { isAdmin } from "../middlwares/isAdmin.js";
import { getAnalytics } from "../controller/admin.controller.js";



const routerAdmin=express.Router();


routerAdmin.get("/analytics",verifyToken,getUserDetails,isAdmin,getAnalytics);


export default routerAdmin;
