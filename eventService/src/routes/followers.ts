import followersController from "../controllers/followersController";
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

router.post("/following", checkAuth, async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
        const roleId = req.body.roleId;
        const controller = new followersController();
        const response: any = await controller.following(userId,followingId,roleId);
        res.status(200).json(successResponse("following ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in following", res.statusCode));
    }
});
router.post("/unfollowing", checkAuth, async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
        const roleId = req.body.roleId;
        const controller = new followersController();
        const response: any = await controller.unfollowing(userId,followingId,roleId);
        res.status(200).json(successResponse("unfollowing", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in unfollowing", res.statusCode));
    }
});

router.get("/getFollowers", checkAuth, async (req, res) => {
    try {
        
        const userId = req.query.userId; 
        
        const controller = new followersController();
        const response: any = await controller.getFollowers(userId);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});





export default router;