import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import AuthController from "../controllers/AuthController";







router.post("/sendotp", async (req, res) => {
 
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotp(body);
        res.status(200).json(successResponse("sendotp", response, res.statusCode));
    } catch (error) {
  
        res.status(500).json(errorResponse("error in sendotp", res.statusCode));
    }
})
router.post("/sendotpbyapi", async (req, res) => {
 
    try {
        const body:any = req.body
        const controller = new AuthController();
        const response = await controller.sendotpByApi(body);
        res.status(200).json(successResponse("sendotpbyapi", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in sendotpbyapi", res.statusCode));
    }
})


router.post("/verifyotpByApi", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response:any = await controller.verifyotpByApi(body);
        res.status(200).json(successResponse("verifyotpByApi", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in verifyotpByApi", res.statusCode));
    }
})
router.post("/verifyotp", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response:any = await controller.verifyotpByApi(body);
        res.status(200).json(successResponse("verifyotp", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in verifyotp", res.statusCode));
    }
})
router.patch("/editprofile", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response = await controller.editProfile(body);
        res.status(200).json(successResponse("editprofile", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in editProfile", res.statusCode));
    }
})


router.get("/viewProfile", async (req, res) => {
    try {
        const userId = req.query.userId ;
        const controller = new AuthController();
        const response = await controller.viewProfile(userId);
        res.status(200).json(successResponse("viewProfile", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in viewProfile", res.statusCode));
    }
});


export default router;

