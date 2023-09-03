import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademyOwner } from "../models/academyOwner";

import AcademyOwnerController from "../controllers/AcademyOwner";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new AcademyOwnerController();
        const response = await controller.createAcademyOwner(body);
        res.status(200).json(successResponse("create AcademyOwner", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create AcademyOwner", res.statusCode));
    }
});

router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new AcademyOwnerController();
        const response = await controller.createAcademyOwner(body);
        res.status(200).json(successResponse("create AcademyOwner", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create AcademyOwner", res.statusCode));
    }
});
router.patch("/AcademyOwner/:id", checkAuth, async (req, res) => {
    try {
        const AcademyOwnerId = req.params.id;
        const body = req.body as IAcademyOwner;
        const controller = new AcademyOwnerController();
        const response: IAcademyOwner = await controller.editAcademyOwner(body, AcademyOwnerId);
        res.status(200).json(successResponse("edit AcademyOwner", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit AcademyOwner", res.statusCode));
    }
});

router.get("/AcademyOwnerList", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyOwnerController();
        const stateId = req.query.stateId;
        const response: IAcademyOwner[] = await controller.getAcademyOwnerList(stateId);
        res.status(200).json(successResponse("AcademyOwner list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in AcademyOwner list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const AcademyOwnerId: any = req.query.AcademyOwnerId;
        const controller = new AcademyOwnerController();
        const response: any = await controller.getAcademyOwnerInfoById(AcademyOwnerId);
        res.status(200).json(successResponse("getAcademyOwner", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getAcademyOwner", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const AcademyOwnerId = req.params.id;
        const controller = new AcademyOwnerController();
        const response: IAcademyOwner = await controller.deleteAcademyOwner(AcademyOwnerId);
        res.status(200).json(successResponse("deleteAcademyOwner", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteAcademyOwner", res.statusCode));
    }
})


export default router;