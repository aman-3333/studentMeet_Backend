
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademySubType } from "../models/academySubType";
import AcademySubTypeController from "../controllers/AcademySubTypeController"
router.post("/create",  async (req, res) => {
    try {
        

const body = req.body;
        const controller = new AcademySubTypeController();
        const response = await controller.createAcademySubType(body);
        res.status(200).json(successResponse("create AcademySubType", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create AcademySubType", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const AcademySubTypeId = req.params.id;
        const body = req.body as IAcademySubType;
        const controller = new AcademySubTypeController();
        const response: IAcademySubType = await controller.editAcademySubType(body, AcademySubTypeId);
        res.status(200).json(successResponse("edit AcademySubType", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit AcademySubType", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new AcademySubTypeController();
        const academyId=req.query.academyId
        const response: IAcademySubType[] = await controller.getAcademySubTypeList(academyId);
        res.status(200).json(successResponse("AcademySubType list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in AcademySubType list", res.statusCode));
    }
});


router.get("/ById", checkAuth, async (req, res) => {
    try {
        const AcademySubTypeId:any = req.query.AcademySubTypeId;
        const controller = new AcademySubTypeController();
        const response: any = await controller.getAcademySubTypeInfoById(AcademySubTypeId);
        res.status(200).json(successResponse("get AcademySubType", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get AcademySubType", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const AcademySubTypeId = req.params.id;
        const controller = new AcademySubTypeController();
        const response: IAcademySubType = await controller.deleteAcademySubType(AcademySubTypeId);
        res.status(200).json(successResponse("delete AcademySubType", response, res.statusCode));

    } catch (error) {

        res.status(500).json(errorResponse("error in delete AcademySubType", res.statusCode));
    }
})


export default router;