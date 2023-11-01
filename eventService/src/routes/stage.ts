import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IStage } from "../models/stages";
import StageController from "../controllers/StageConreoller";
router.post("/create",  async (req, res) => {
    try {
        

const body = req.body;
        const controller = new StageController();
        const response = await controller.createStage(body);
        res.status(200).json(successResponse("create Stage", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Stage", res.statusCode));
    }
});

router.patch("/edit/:id",  async (req, res) => {
    try {
        const StageId = req.params.id;
        const body = req.body as IStage;
        const controller = new StageController();
        const response: IStage = await controller.editStage(body, StageId);
        res.status(200).json(successResponse("edit Stage", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Stage", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new StageController();
        const academySubTypeId=req.query.academySubTypeId;
        const response: IStage[] = await controller.getStageList(academySubTypeId);
        res.status(200).json(successResponse("Stage list", response, res.statusCode));
    } catch (error) {
      console.log(error,"error");
        res.status(500).json(errorResponse("error in Stage list", res.statusCode));
    }
});


router.get("/info/byid",  async (req, res) => {
    try {
        const StageId: any = req.query.StageId;
        const controller = new StageController();
        const response: any = await controller.getstageInfoById(StageId);
        res.status(200).json(successResponse("getStage", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getStage", res.statusCode));
    }
});


router.post("/delete",  async (req, res) => {
    try {
        const StageId = req.body._id;
        const controller = new StageController();
        const response: IStage = await controller.deleteStage(StageId);
        res.status(200).json(successResponse("deleteStage", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteStage", res.statusCode));
    }
})


export default router;