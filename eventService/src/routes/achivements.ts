import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAchivement } from "../models/achivement";

import AchivementController from "../controllers/AchivementController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new AchivementController();
        const response = await controller.createAchivement(body);
        res.status(200).json(successResponse("create Achivement", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Achivement", res.statusCode));
    }
});

router.post("/delete",  async (req, res) => {
    try {
req.body.user=res.locals.user
const body = req.body;
        const controller = new AchivementController();
        const response = await controller.createAchivement(body);
        res.status(200).json(successResponse("delete Achivement", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in delete Achivement", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
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

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new AchivementController();
        
        const response: IAchivement[] = await controller.getAchivementList();
        res.status(200).json(successResponse("Achivement list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Achivement list", res.statusCode));
    }
});

router.get("/academy/achivement/list", checkAuth, async (req, res) => {
    try {
        const controller = new AchivementController();
        const academyId = req.query.academyId;
        const response: IAchivement[] = await controller.getAcademyAchivement(academyId);
        res.status(200).json(successResponse("getAcademyAchivement list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getAcademyAchivement list", res.statusCode));
    }
});


router.get("/user/achivement/list", checkAuth, async (req, res) => {
    try {
        const controller = new AchivementController();
        const userId = req.query.userId;
        const response: IAchivement[] = await controller.getUserAchivement(userId);
        res.status(200).json(successResponse("getUserAchivement list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getUserAchivement list", res.statusCode));
    }
});

router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const AchivementId: any = req.query.AchivementId;
        const controller = new AchivementController();
        const response: any = await controller.getAchivementInfoById(AchivementId);
        res.status(200).json(successResponse("getAchivement", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getAchivement", res.statusCode));
    }
});


router.get("/all/delete/:id", checkAuth, async (req, res) => {
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