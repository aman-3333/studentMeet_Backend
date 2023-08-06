import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademy } from "../models/academy";
import AcademyController from "../controllers/AcademyController";
router.post("/createAcademy", checkAuth, async (req, res) => {
    try {
        const body = req.body;
        const controller = new AcademyController();
        const response = await controller.createAcademy(body);
        res.status(200).json(successResponse("create academy", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create academy", res.statusCode));
    }
});

router.patch("/academy/:id", checkAuth, async (req, res) => {
    try {
        const academyId = req.params.id;
        const body = req.body as IAcademy;
        const controller = new AcademyController();
        const response: IAcademy = await controller.editAcademy(body, academyId);
        res.status(200).json(successResponse("edit academy", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit academy", res.statusCode));
    }
});

router.get("/academyList", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
        const stateId = req.query.stateId;
        const userId = req.query.userId;
        const response: IAcademy[] = await controller.getAcademyList(stateId,userId);
        res.status(200).json(successResponse("academy list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy list", res.statusCode));
    }
});

router.get("/academyinfobyid", checkAuth, async (req, res) => {
    try {
        const academyId: any = req.query.academyId;
        const controller = new AcademyController();
        const response: any = await controller.getAcademyInfoById(academyId);
        res.status(200).json(successResponse("getacademy", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getacademy", res.statusCode));
    }
});

router.patch("/deleteacademy/:id", checkAuth, async (req, res) => {
    try {
        const academyId = req.params.id;
        const controller = new AcademyController();
        const response: IAcademy = await controller.deleteAcademy(academyId);
        res.status(200).json(successResponse("delete academy", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteacademy", res.statusCode));
    }
}) 


router.get("/searchAcademy", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
        const search = req.query.search;
    
        const response:any = await controller.searchAcademy(search);
        res.status(200).json(successResponse("academy list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy list", res.statusCode));
    }
});


router.get("/filterAcademy", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
   
        const sports = req.query.sports;
        const response:any = await controller.filterAcademy(sports);
        res.status(200).json(successResponse("academy list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy list", res.statusCode));
    }
});





export default router;