import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademyEvent } from "../models/academyEvent";
import AcademyEventController from "../controllers/AcademyEventController"
router.post("/create",  async (req, res) => {
    try {
        

const body = req.body;
        const controller = new AcademyEventController();
        const response = await controller.createAcademyEvent(body);
        res.status(200).json(successResponse("create AcademyEvent", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create AcademyEvent", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const AcademyEventId = req.params.id;
        const body = req.body as IAcademyEvent;
        const controller = new AcademyEventController();
        const response: IAcademyEvent = await controller.editAcademyEvent(body, AcademyEventId);
        res.status(200).json(successResponse("edit AcademyEvent", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit AcademyEvent", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new AcademyEventController();
        const academyId:any = req.query.academyId;
        const response: IAcademyEvent[] = await controller.getAcademyEventList(academyId);
        res.status(200).json(successResponse("AcademyEvent list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in AcademyEvent list", res.statusCode));
    }
});


router.get("/info/byid",  async (req, res) => {
    try {
        const academyEventId:any = req.query.academyEventId;
        const controller = new AcademyEventController();
        const response: any = await controller.getAcademyEventInfoById(academyEventId);
        res.status(200).json(successResponse("get AcademyEvent", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get AcademyEvent", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const AcademyEventId = req.params.id;
        const controller = new AcademyEventController();
        const response: IAcademyEvent = await controller.deleteAcademyEvent(AcademyEventId);
        res.status(200).json(successResponse("delete AcademyEvent", response, res.statusCode));

    } catch (error) {

        res.status(500).json(errorResponse("error in delete AcademyEvent", res.statusCode));
    }
})


export default router;