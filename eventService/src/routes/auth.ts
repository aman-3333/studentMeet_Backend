import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

import authController from "../controllers/AuthController";
router.post("/sendotp",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new authController();
        const response = await controller.sendotp(body);
        res.status(200).json(successResponse("sendotp", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in sendotp", res.statusCode));
    }
});

router.post("/verifyotp",  async (req, res) => {
    try {
       
        const body = req.body 
        const controller = new authController();
        const response:any= await controller.verifyotpByApi(body);
        res.status(200).json(successResponse("verifyotp", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in verifyotp", res.statusCode));
    }
});

router.post("/editprofile",  async (req, res) => {
    try {
        const controller = new authController();
        const body = req.body 
        const response = await controller.editProfile(body);
        res.status(200).json(successResponse("editProfile", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in editProfile", res.statusCode));
    }
});


router.get("/getprofile", checkAuth, async (req, res) => {
    try {
        const userId: any = req.query.userId;
        const controller = new authController();
        const response: any = await controller.viewProfile(userId);
        res.status(200).json(successResponse("getProfile", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getProfile", res.statusCode));
    }
});





export default router;