import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IGuideLines } from "../models/guidelines";
import GuideLinesController from "../controllers/guideLines"
router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new GuideLinesController();
        const response = await controller.createGuideLines(body);
        res.status(200).json(successResponse("create GuideLines", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create GuideLines", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const GuideLinesId = req.params.id;
        const body = req.body as IGuideLines;
        const controller = new GuideLinesController();
        const response: IGuideLines = await controller.editGuideLines(body, GuideLinesId);
        res.status(200).json(successResponse("edit GuideLines", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit GuideLines", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new GuideLinesController();
        const CategoryId=req.query.CategoryId
        const response: IGuideLines[] = await controller.getGuideLinesList(CategoryId);
        res.status(200).json(successResponse("GuideLines list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in GuideLines list", res.statusCode));
    }
});


router.get("/ById", checkAuth, async (req, res) => {
    try {
        const GuideLinesId:any = req.query.GuideLinesId;
        const controller = new GuideLinesController();
        const response: any = await controller.getGuideLinesInfoById(GuideLinesId);
        res.status(200).json(successResponse("get GuideLines", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get GuideLines", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const GuideLinesId = req.params.id;
        const controller = new GuideLinesController();
        const response: IGuideLines = await controller.deleteGuideLines(GuideLinesId);
        res.status(200).json(successResponse("delete GuideLines", response, res.statusCode));

    } catch (error) {

        res.status(500).json(errorResponse("error in delete GuideLines", res.statusCode));
    }
})


export default router;