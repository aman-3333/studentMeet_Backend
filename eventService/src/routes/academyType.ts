import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademyType } from "../models/academyType";
import AcademyTypeController from "../controllers/AcademyTypeController"
router.post("/create",  async (req, res) => {
    try {
        

const body = req.body;
        const controller = new AcademyTypeController();
        const response = await controller.createAcademyType(body);
        res.status(200).json(successResponse("create AcademyType", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create AcademyType", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const AcademyTypeId = req.params.id;
        const body = req.body as IAcademyType;
        const controller = new AcademyTypeController();
        const response: IAcademyType = await controller.editAcademyType(body, AcademyTypeId);
        res.status(200).json(successResponse("edit AcademyType", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit AcademyType", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyTypeController();
        const response: IAcademyType[] = await controller.getAcademyTypeList();
        res.status(200).json(successResponse("AcademyType list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in AcademyType list", res.statusCode));
    }
});


router.get("/ById", checkAuth, async (req, res) => {
    try {
        const AcademyTypeId:any = req.query.AcademyTypeId;
        const controller = new AcademyTypeController();
        const response: any = await controller.getAcademyTypeInfoById(AcademyTypeId);
        res.status(200).json(successResponse("get AcademyType", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get AcademyType", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const AcademyTypeId = req.params.id;
        const controller = new AcademyTypeController();
        const response: IAcademyType = await controller.deleteAcademyType(AcademyTypeId);
        res.status(200).json(successResponse("delete AcademyType", response, res.statusCode));

    } catch (error) {

        res.status(500).json(errorResponse("error in delete AcademyType", res.statusCode));
    }
})


export default router;