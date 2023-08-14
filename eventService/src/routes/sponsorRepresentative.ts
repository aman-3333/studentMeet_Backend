
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import sonsorRepresentativeController from "../controllers/sponsorRepresentativeController";
import  { ISonsorRepresentative } from "../models/sponsorRepresentative";


router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
     
        const controller = new sonsorRepresentativeController();
        const response:ISonsorRepresentative = await controller.createsonsorRepresentative(body);
        res.status(200).json(successResponse("create sonsorRepresentative", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in create sonsorRepresentative", res.statusCode));
    }
});


router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const sonsorRepresentativeId = req.params.id;
        
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new sonsorRepresentativeController();
        const response: ISonsorRepresentative = await controller.editsonsorRepresentative(body, sonsorRepresentativeId);
        res.status(200).json(successResponse("sonsorRepresentative update", response, res.statusCode));
    } catch(error) {
    
        res.status(500).json(errorResponse("error in sonsorRepresentative update", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new sonsorRepresentativeController();
       
        const response: any= await controller.getsonsorRepresentative();
        res.status(200).json(successResponse("get sonsorRepresentative", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get sonsorRepresentative", res.statusCode));
    }
});
router.get("/search", checkAuth, async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const searchValue=req.query.searchValue;
        const controller = new sonsorRepresentativeController();
  
        const response: any = await controller.searchsonsorRepresentative(stateId, searchValue);
        res.status(200).json(successResponse("get sonsorRepresentative", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in get sonsorRepresentative", res.statusCode));
    }
});

router.get("/infoById", checkAuth, async (req, res) => {
    try {
        const representativeId: any= req.query.representativeId;
        const userId=req.body.userId;
        const controller = new sonsorRepresentativeController();
        const response:any = await controller.getsonsorRepresentativeInfobyId(representativeId);
        res.status(200).json(successResponse("get sonsorRepresentative by Id ", response, res.statusCode));
    } catch(error) {
      
        res.status(500).json(errorResponse("error in get sonsorRepresentative by Id", res.statusCode));
    }
});
router.patch("/delete/:id", checkAuth, async (req, res) => {
    try {
        const sonsorRepresentativeId = req.params.id;
        const controller = new sonsorRepresentativeController();
        const response: any = await controller.deletesonsorRepresentative(sonsorRepresentativeId);
        res.status(200).json(successResponse("sonsorRepresentative update", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in sonsorRepresentative update", res.statusCode));
    }
});


export default router;