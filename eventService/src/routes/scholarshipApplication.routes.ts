import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IScholarshipApplication } from "../models/scholarshipApplications.model";

import ScholarshipApplicationController from "../controllers/ScholarshipApplicationController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new ScholarshipApplicationController();
        const response = await controller.createScholarshipApplication(body);
        res.status(200).json(successResponse("create ScholarshipApplication", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create ScholarshipApplication", res.statusCode));
    }
});

router.patch("/edit", checkAuth, async (req, res) => {
    try {
        const body = req.body as IScholarshipApplication;
        const controller = new ScholarshipApplicationController();
        const response: IScholarshipApplication = await controller.editScholarshipApplication(body);
        res.status(200).json(successResponse("edit ScholarshipApplication", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit ScholarshipApplication", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new ScholarshipApplicationController();
        const response: IScholarshipApplication[] = await controller.getScholarshipApplicationList();
        res.status(200).json(successResponse("ScholarshipApplication list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in ScholarshipApplication list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const scholarshipApplicationId: any = req.query.scholarshipApplicationId;
        const controller = new ScholarshipApplicationController();
        const response: any = await controller.getScholarshipApplicationInfoById(scholarshipApplicationId);
        res.status(200).json(successResponse("getScholarshipApplication", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getScholarshipApplication", res.statusCode));
    }
});


router.post("/delete", checkAuth, async (req, res) => {
    try {
        const scholarshipApplicationId = req.body._id;;
        const controller = new ScholarshipApplicationController();
        const response: IScholarshipApplication = await controller.deleteScholarshipApplication(scholarshipApplicationId);
        res.status(200).json(successResponse("deleteScholarshipApplication", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteScholarshipApplication", res.statusCode));
    }
})


export default router;