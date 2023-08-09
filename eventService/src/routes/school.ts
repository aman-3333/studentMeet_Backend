
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import SchoolController from "../controllers/SchoolController";
import  { ISchool } from "../models/school";


router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
     
        const controller = new SchoolController();
        const response:ISchool = await controller.createSchool(body);
        res.status(200).json(successResponse("create School", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in create School", res.statusCode));
    }
});
router.get("/search", checkAuth, async (req, res) => {
    try {
        const controller = new SchoolController();
   const stateId =req.query.stateId
  
        const response: any = await controller.getSchool(stateId);
        res.status(200).json(successResponse("get searchSchool", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get searchSchool", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const SchoolId = req.params.id;
        
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new SchoolController();
        const response: ISchool = await controller.editSchool(body, SchoolId);
        res.status(200).json(successResponse("School update", response, res.statusCode));
    } catch(error) {
    
        res.status(500).json(errorResponse("error in School update", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new SchoolController();
        const stateId=req.query.stateId;
        const response: any= await controller.getSchool(stateId);
        res.status(200).json(successResponse("get School", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get School", res.statusCode));
    }
});
router.get("/search", checkAuth, async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const searchValue=req.query.searchValue;
        const controller = new SchoolController();
  
        const response: any = await controller.searchSchool(stateId, searchValue);
        res.status(200).json(successResponse("get School", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get School", res.statusCode));
    }
});

router.get("/infoById", checkAuth, async (req, res) => {
    try {
        const SchoolId: any= req.query.SchoolId;
        const userId=req.body.userId;
        const controller = new SchoolController();
        const response:any = await controller.getSchoolInfoById(SchoolId);
        res.status(200).json(successResponse("get School by Id ", response, res.statusCode));
    } catch(error) {
      
        res.status(500).json(errorResponse("error in get School by Id", res.statusCode));
    }
});
router.patch("/delete/:id", checkAuth, async (req, res) => {
    try {
        const SchoolId = req.params.id;
        const controller = new SchoolController();
        const response: any = await controller.deleteSchool(SchoolId);
        res.status(200).json(successResponse("School update", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in School update", res.statusCode));
    }
});


export default router;