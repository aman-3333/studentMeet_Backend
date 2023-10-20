import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ISchoolOwner } from "../models/schoolsOwner.model";

import SchoolOwnerController from "../controllers/SchoolOwner";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new SchoolOwnerController();
        const response = await controller.createSchoolOwner(body);
        res.status(200).json(successResponse("create SchoolOwner", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create SchoolOwner", res.statusCode));
    }
});

router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new SchoolOwnerController();
        const response = await controller.createSchoolOwner(body);
        res.status(200).json(successResponse("create SchoolOwner", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create SchoolOwner", res.statusCode));
    }
});
router.post("/edit",  async (req, res) => {
    try {
      
        const body = req.body as ISchoolOwner;
        const controller = new SchoolOwnerController();
        const response: ISchoolOwner = await controller.editSchoolOwner(body);
        res.status(200).json(successResponse("edit SchoolOwner", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit SchoolOwner", res.statusCode));
    }
});

router.get("/SchoolOwnerList", checkAuth, async (req, res) => {
    try {
        const controller = new SchoolOwnerController();
        const stateId = req.query.stateId;
        const response: ISchoolOwner[] = await controller.getSchoolOwnerList(stateId);
        res.status(200).json(successResponse("SchoolOwner list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in SchoolOwner list", res.statusCode));
    }
});

// getBankdetailInfoById
router.get("/infobyid",  async (req, res) => {
    try {
        const schoolOwnerId: any = req.query.schoolOwnerId;
        const controller = new SchoolOwnerController();
        const response: any = await controller.getSchoolOwnerInfoById(schoolOwnerId);
        res.status(200).json(successResponse("getSchoolOwner", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getSchoolOwner", res.statusCode));
    }
});


router.get("/bankdetail",  async (req, res) => {
    try {
        const schoolOwnerId: any = req.query.schoolOwnerId;
        const controller = new SchoolOwnerController();
        const response: any = await controller.getBankdetailInfoById(schoolOwnerId);
        res.status(200).json(successResponse("getSchoolOwner", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getSchoolOwner", res.statusCode));
    }
});

router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const schoolOwnerId = req.params.id;
        const controller = new SchoolOwnerController();
        const response: ISchoolOwner = await controller.deleteSchoolOwner(schoolOwnerId);
        res.status(200).json(successResponse("deleteSchoolOwner", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteSchoolOwner", res.statusCode));
    }
})


export default router;