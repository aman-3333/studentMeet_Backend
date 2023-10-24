import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IScholarship } from "../models/scholarship.model";

import ScholarshipController from "../controllers/ScholarshipController";
router.post("/create",  async (req, res) => {
    try {
        

const body = req.body;
        const controller = new ScholarshipController();
        const response = await controller.createScholarship(body);
        res.status(200).json(successResponse("create Scholarship", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Scholarship", res.statusCode));
    }
});

router.post("/edit",  async (req, res) => {
    try {
        const body = req.body as IScholarship;
        const controller = new ScholarshipController();
        const response: IScholarship = await controller.editScholarship(body);
        res.status(200).json(successResponse("edit Scholarship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Scholarship", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new ScholarshipController();
        const schoolId=req.query.schoolId;
        const response: IScholarship[] = await controller.getScholarshipList(schoolId);
        res.status(200).json(successResponse("Scholarship list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Scholarship list", res.statusCode));
    }
});


router.get("/infobyid",  async (req, res) => {
    try {
        const scholarshipId: any = req.query.scholarshipId;
        const controller = new ScholarshipController();
        const response: any = await controller.getScholarshipInfoById(scholarshipId);
        res.status(200).json(successResponse("getScholarship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getScholarship", res.statusCode));
    }
});



router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const scholarshipId = req.params.id;
        const controller = new ScholarshipController();
        const response: IScholarship = await controller.deleteScholarship(scholarshipId);
        res.status(200).json(successResponse("deleteScholarship", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteScholarship", res.statusCode));
    }
})


export default router;