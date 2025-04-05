import express from "express";
import { uploadDocument } from "../controller/document.controller.js";
import { getUserDocuments } from "../controller/document.controller.js";
import { getDocument } from "../controller/document.controller.js";
import { getUserDetails } from "../middlwares/userdetails.js";
import { downloadDocument } from "../controller/document.controller.js";
import uploadFile from "../middlwares/uploadMiddleware.js";
import { verifyToken } from "../middlwares/verifyToken.js";



const routerDocument=express.Router();

routerDocument.post("/upload",verifyToken,getUserDetails,uploadFile,uploadDocument);
routerDocument.get("/",verifyToken,getUserDetails,getUserDocuments);
routerDocument.get("/:id",verifyToken,getDocument);
routerDocument.get("/download/:id",verifyToken,downloadDocument);


export default routerDocument;