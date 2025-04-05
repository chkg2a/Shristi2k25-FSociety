import express from "express";
import { verifyToken } from "../middlwares/verifyToken.js";
import { matchDocuments } from "../service/matchingService.js";
import { getUserDetails } from "../middlwares/userdetails.js";

const routerMatch=express.Router();

routerMatch.post("/",verifyToken,getUserDetails,matchDocuments);


export default routerMatch;