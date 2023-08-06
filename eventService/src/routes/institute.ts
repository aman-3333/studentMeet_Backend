
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import InstituteController from "../controllers/InstituteController";
import  { IInstitute } from "../models/InstituteModel";


router.post("/createInstitute", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
     
        const controller = new InstituteController();
        const response:IInstitute = await controller.createInstitute(body);
        res.status(200).json(successResponse("create Institute", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in create Institute", res.statusCode));
    }
});
router.get("/searchInstitute", checkAuth, async (req, res) => {
    try {
        const controller = new InstituteController();
   const stateId =req.query.stateId
   const searchValue:any =req.query.searchValue
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get searchInstitute", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get searchInstitute", res.statusCode));
    }
});

router.patch("/Institute/:id", checkAuth, async (req, res) => {
    try {
        const InstituteId = req.params.id;
        
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new InstituteController();
        const response: IInstitute = await controller.editInstitute(body, InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
    
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});

router.get("/InstituteList", checkAuth, async (req, res) => {
    try {
        const controller = new InstituteController();
        const stateId=req.query.stateId;
        const response: any= await controller.getInstitute(stateId);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});
router.get("/searchInstitute", checkAuth, async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const searchValue=req.query.searchValue;
        const controller = new InstituteController();
  
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});

router.get("/getInstituteInfoById", checkAuth, async (req, res) => {
    try {
        const InstituteId: any= req.query.InstituteId;
        const userId=req.body.userId;
        const controller = new InstituteController();
        const response:any = await controller.getInstituteInfoById(InstituteId);
        res.status(200).json(successResponse("get Institute by Id ", response, res.statusCode));
    } catch(error) {
      
        res.status(500).json(errorResponse("error in get Institute by Id", res.statusCode));
    }
});
router.patch("/deleteInstitute/:id", checkAuth, async (req, res) => {
    try {
        const InstituteId = req.params.id;
        const controller = new InstituteController();
        const response: any = await controller.deleteInstitute(InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});


export default router;