import express from "express";
import { verifyToken } from "../middlwares/verifyToken.js";
import { getUserDetails } from "../middlwares/userdetails.js";
import { requestCredits } from "../controller/credit.controller.js";
import { getPendingCreditRequests } from "../controller/credit.controller.js";
import { getUserCreditRequests } from "../controller/credit.controller.js";
import { isAdmin } from "../middlwares/isAdmin.js";
import { processCreditRequest } from "../controller/credit.controller.js";

const routerCredit=express.Router();


routerCredit.post("/request",verifyToken,getUserDetails,requestCredits);
routerCredit.get("/requests",verifyToken,getUserDetails,getUserCreditRequests)



routerCredit.get("/admin/pending",verifyToken,getUserDetails,isAdmin,getPendingCreditRequests);
routerCredit.post("/admin/process",verifyToken,getUserDetails,isAdmin,processCreditRequest);

export default routerCredit;






