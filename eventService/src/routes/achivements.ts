import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAchivement } from "../models/achivement";

import AchivementController from "../controllers/AchivementController";
router.post("/createAchivement", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AchivementController();
        const response = await controller.createAchivement(body);
        res.status(200).json(successResponse("create Achivement", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Achivement", res.statusCode));
    }
});

router.patch("/Achivement/:id", async (req, res) => {
    try {
        const AchivementId = req.params.id;
        const body = req.body as IAchivement;
        const controller = new AchivementController();
        const response: IAchivement = await controller.editAchivement(body, AchivementId);
        res.status(200).json(successResponse("edit Achivement", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Achivement", res.statusCode));
    }
});

router.get("/AchivementList", async (req, res) => {
    try {
        const controller = new AchivementController();
        const stateId = req.query.stateId;
        const response: IAchivement[] = await controller.getAchivementList(stateId);
        res.status(200).json(successResponse("Achivement list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Achivement list", res.statusCode));
    }
});


router.get("/Achivementinfobyid", async (req, res) => {
    try {
        const AchivementId: any = req.query.AchivementId;
        const controller = new AchivementController();
        const response: any = await controller.getAchivementInfoById(AchivementId);
        res.status(200).json(successResponse("getAchivement", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getAchivement", res.statusCode));
    }
});


router.get("/deleteAchivement/:id", async (req, res) => {
    try {
        const AchivementId = req.params.id;
        const controller = new AchivementController();
        const response: IAchivement = await controller.deleteAchivement(AchivementId);
        res.status(200).json(successResponse("deleteAchivement", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteAchivement", res.statusCode));
    }
})


export default router;