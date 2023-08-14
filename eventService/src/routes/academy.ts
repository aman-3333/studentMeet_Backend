import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IAcademy } from "../models/academy";
import AcademyController from "../controllers/AcademyController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new AcademyController();
        const response = await controller.createAcademy(body);
        res.status(200).json(successResponse("create academy", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create academy", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
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

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
        let user=res.locals.user
        console.log(user);
        
        const response: IAcademy[] = await controller.getAcademyList(user);
        res.status(200).json(successResponse("academy list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy list", res.statusCode));
    }
});

router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const academyId: any = req.query.academyId;
        const controller = new AcademyController();
        const response: any = await controller.getAcademyInfoById(academyId);
        res.status(200).json(successResponse("getacademy", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getacademy", res.statusCode));
    }
});

router.patch("/delete/:id", checkAuth, async (req, res) => {
    try {
        const academyId = req.params.id;
        const controller = new AcademyController();
        const response: IAcademy = await controller.deleteAcademy(academyId);
        res.status(200).json(successResponse("delete academy", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteacademy", res.statusCode));
    }
}) 


router.get("/search", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
        const search = req.query.search;
    
        const response:any = await controller.searchAcademy(search);
        res.status(200).json(successResponse("academy academy", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy list", res.statusCode));
    }
});


router.get("/filter", checkAuth, async (req, res) => {
    try {
        const controller = new AcademyController();
   
        const sports = req.query.sports;
        const response:any = await controller.filterAcademy(sports);
        res.status(200).json(successResponse("academy filter", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in academy filter", res.statusCode));
    }
});





export default router;