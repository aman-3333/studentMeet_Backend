import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ISchoolInfrastructure } from "../models/schoolInfrasturcture";
import SchoolInfrastructureController from "../controllers/SchoolInfratructureController";

router.post("/create",  async (req, res) => {
    try {
        req.body.user=res.locals.user
         const body = req.body;
        const controller = new SchoolInfrastructureController();
        const response = await controller.createSchoolInfrastructure(body);
        res.status(200).json(successResponse("create SchoolInfrastructure", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create SchoolInfrastructure", res.statusCode));
    }
});

router.post("/create",  async (req, res) => {
    try {       
        const body = req.body;
        const controller = new SchoolInfrastructureController();
        const response = await controller.createSchoolInfrastructure(body);
        res.status(200).json(successResponse("create SchoolInfrastructure", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create SchoolInfrastructure", res.statusCode));
    }
});


router.post("/edit",  async (req, res) => {
    try {
      
        const body = req.body as ISchoolInfrastructure;
        const controller = new SchoolInfrastructureController();
        const response: ISchoolInfrastructure = await controller.editSchoolInfrastructure(body);
        res.status(200).json(successResponse("edit SchoolInfrastructure", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit SchoolInfrastructure", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new SchoolInfrastructureController();
        const schoolId = req.query.schoolId;
        const response: ISchoolInfrastructure[] = await controller.getSchoolInfrastructureList(schoolId);
        res.status(200).json(successResponse("SchoolInfrastructure list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in SchoolInfrastructure list", res.statusCode));
    }
});

// getBankdetailInfo
router.get("/infobyid",  async (req, res) => {
    try {
        const schoolInfrastructureId: any = req.query.schoolInfrastructureId;
        const controller = new SchoolInfrastructureController();
        const response: any = await controller.getSchoolInfrastructureInfoById(schoolInfrastructureId);
        res.status(200).json(successResponse("getSchoolInfrastructure", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getSchoolInfrastructure", res.statusCode));
    }
});



router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const schoolInfrastructureId = req.params.id;
        const controller = new SchoolInfrastructureController();
        const response: ISchoolInfrastructure = await controller.deleteSchoolInfrastructure(schoolInfrastructureId);
        res.status(200).json(successResponse("deleteSchoolInfrastructure", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteSchoolInfrastructure", res.statusCode));
    }
})


export default router;